import React, { useRef, useState } from "react"; // Import from your firebase.js (also in TypeScript)
import { UploadTaskSnapshot } from "@firebase/storage"; // Import for type safety
import { storage } from "@/services/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
interface File {
  name: string;
}

function FileUploader() {
  //   const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    } else {
      console.log("else");
    }
  };
  //   const handleFileChange = (event: any) => {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const arrayBuffer = reader.result;
  //       setSelectedFile(arrayBuffer);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   };

  const handleUpload = async () => {
    if (!selectedFiles.length) return; // Check if a file is selected
    setUploading(true);
    setUploadProgress(0);

    // Generate a unique filename to prevent overwriting

    try {
      for (const file of selectedFiles) {
        // Generate a unique filename to prevent overwriting
        const filename = `${file.name.split(".")[0]}-${Date.now()}-${
          file.name.split(".")[1]
        }`;
        const storageRef = ref(storage, `uploads/${filename}`);

        const uploadTask = uploadBytesResumable(storageRef, file); // Use put for simpler uploads

        // Track upload progress
        uploadTask.on(
          "state_changed",
          (snapshot: UploadTaskSnapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadProgress(progress);
          },
          (error: any) => {
            console.error(error);
          },
          () => {
            console.log("File uploaded successfully!");
          }
        );
      }
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false); // Reset uploading state on error
    } finally {
      setSelectedFiles([]); // Clear selected files after upload
      setUploading(false); // Reset uploading state even on error
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
      <div className="text-2xl">
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      </div>
    </div>
  );
}

export default FileUploader;
