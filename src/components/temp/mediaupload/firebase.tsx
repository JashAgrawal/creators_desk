import React, { useRef, useState } from "react";
import { getDownloadURL } from "@firebase/storage";
import { storage } from "@/services/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { ROOT_FOLDER } from "@/contexts/useFolder";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "@/contexts/useAuth";
import { Timestamp, where, query, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase"; // Assuming you have a firebase.js file that exports the Firestore instance
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

interface UploadFile {
  id: string;
  name: string;
  progress: number;
  error: boolean;
}

interface FileUploaderProps {
  currentFolder: any;
}

const FileUploader: React.FC<FileUploaderProps> = ({ currentFolder }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles) return; // Check if a file is selected

    setUploading(true);

    try {
      for (const file of selectedFiles) {
        const id = uuidv4();
        setUploadingFiles(prevUploadingFiles => [
          ...prevUploadingFiles,
          { id, name: file.name, progress: 0, error: false },
        ]);

        const filePath = currentFolder === ROOT_FOLDER
          ? `${currentFolder.path.join("/")}/${file.name}`
          : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

        const storageRef = ref(storage, `uploads/${currentUser.uid}/${filePath}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadingFiles(prevUploadingFiles =>
              prevUploadingFiles.map(uploadFile =>
                uploadFile.id === id ? { ...uploadFile, progress } : uploadFile
              )
            );
          },
          (error:any) => {
            setUploadingFiles(prevUploadingFiles =>
              prevUploadingFiles.map(uploadFile =>
                uploadFile.id === id ? { ...uploadFile, error: true } : uploadFile
              )
            );
          },
          async () => {
            setUploadingFiles(prevUploadingFiles =>
              prevUploadingFiles.filter(uploadFile => uploadFile.id !== id)
            );

            const url = await getDownloadURL(uploadTask.snapshot.ref);

            const q = query(
              collection(db, "files"),
              where("name", "==", file.name),
              where("userId", "==", currentUser.uid),
              where("folderId", "==", currentFolder.id)
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
                folderId: currentFolder.id,
                userId: currentUser.uid,
              });
            }
          }
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 m-6 border rounded-lg">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        multiple
        className="hidden"
      />
      <button className="border p-3 rounded-lg" onClick={handleClick}>
        Browse Files
      </button>
      <button
        disabled={uploading}
        onClick={handleUpload}
        className="border p-3 rounded-lg"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploadingFiles.length > 0 && (
        <div className="mt-2 p-3 border rounded-lg ">
          {uploadingFiles.map(uploadFile => (
            <div key={uploadFile.id} className="flex items-center space-x-3">
              <p>{uploadFile.name}</p>
              {uploadFile.error ? (
                <p>Error</p>
              ) : (
                <progress value={uploadFile.progress} max="100" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;