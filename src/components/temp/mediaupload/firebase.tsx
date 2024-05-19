import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL } from "@firebase/storage";
import { storage } from "@/services/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/contexts/useAuth";
import { Timestamp, where, query, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase"; // Assuming you have a firebase.js file that exports the Firestore instance
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useRoot } from "@/contexts/root";
import { useFolder } from "@/contexts/useFolder";
import { useFiles } from "@/contexts/files";

export interface UploadFile {
  id: string;
  name: string;
  progress: number;
  error: boolean;
  file: File;
}
export interface UploadFileStatus {
  id: string;
  name: string;
  progress: number;
  error: boolean;
  status?: "Pending" | "Uploading" | "Uploaded" | "Failed";
  file: File;
}

const useFileUploader = () => {
  const { folder: currentFolder } = useFolder();
  const { files, setFiles } = useFiles();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();
  const { ROOT_FOLDER } = useRoot();

  const openFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files.length > 0) {
        for (const file of event.target.files) {
          const fiiile: UploadFileStatus = {
            id: uuidv4(),
            name: file.name,
            progress: 0,
            error: false,
            status: "Pending",
            file,
          };
          setFiles((prevFiles: any) => [...prevFiles, fiiile]);
        }
      }
    }
  };

  const handleUpload = async () => {
    const filesToUpload = files;
    console.log(filesToUpload);
    if (!filesToUpload) return; // Checsk if a file is selected
    if (filesToUpload.length === 0) return;
    setUploading(true);

    try {
      let i = 0;
      for (const file of filesToUpload) {
        if (file.status === "Uploaded") continue;
        // const id = uuidv4();
        //update the status of obj at index i in filestoupload to pending
        const id = file.id;
        setFiles((prevFiles: any) =>
          prevFiles.map((uploadFile: UploadFileStatus) =>
            uploadFile.id === id
              ? { ...uploadFile, status: "Uploading" }
              : uploadFile
          )
        );
        const fileType = file.file.type.split("/")[0];
        const filePath =
          currentFolder === ROOT_FOLDER
            ? `${currentFolder.path.join("/")}/${file.name}`
            : `${currentFolder.path.join("/")}/${currentFolder?.id}/${
                file.name
              }`;

        const storageRef = ref(
          storage,
          `uploads/${currentUser?.uid}/${filePath}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file.file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFiles((prevUploadingFiles: any) =>
              prevUploadingFiles.map((uploadFile: UploadFileStatus) =>
                uploadFile.id === id ? { ...uploadFile, progress } : uploadFile
              )
            );
          },
          (error: any) => {
            setFiles((prevUploadingFiles: any) =>
              prevUploadingFiles.map((uploadFile: UploadFileStatus) =>
                uploadFile.id === id
                  ? { ...uploadFile, error: true, status: "Failed" }
                  : uploadFile
              )
            );
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(file.name, currentFolder?.id);
            const q = query(
              collection(db, "files"),
              where("name", "==", file.name),
              where("userId", "==", currentUser?.uid),
              where("folderId", "==", currentFolder?.id || ROOT_FOLDER.id)
            );

            const existingFilesSnapshot = await getDocs(q);
            const existingFile = existingFilesSnapshot.docs[0];

            if (existingFile) {
              const fileRef = doc(db, "files", existingFile.id);
              await updateDoc(fileRef, { url });
            } else {
              await addDoc(collection(db, "files"), {
                url,
                name: file.name,
                createdAt: Timestamp.now(),
                folderId: currentFolder?.id || ROOT_FOLDER.id,
                userId: currentUser?.uid,
              });
            }
            setFiles((prevUploadingFiles: any) =>
              prevUploadingFiles.map((uploadFile: UploadFileStatus) =>
                uploadFile.id === id
                  ? { ...uploadFile, status: "Uploaded" }
                  : uploadFile
              )
            );
          }
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  return {
    fileInputRef, //ref to file input
    files, //all files
    setFiles, //sets files
    uploading, //uploading status
    setUploading, //sets uploading status
    openFileSelect, //opens file selector
    handleFileChange, //sets files
    handleUpload, //uploads files
  };
};

export default useFileUploader;
