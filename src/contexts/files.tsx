import React, { createContext, useContext, useState } from "react";

export interface UploadFileStatus {
  id: string;
  name: string;
  progress: number;
  error: boolean;
  status?: "Pending" | "Uploading" | "Uploaded" | "Failed";
  file: File;
}
interface FileContextValue {
  files: UploadFileStatus[];
  setFiles: any;
}

const FileContext = createContext<FileContextValue>({
  files: [],
  setFiles: () => {},
});

export function useFiles() {
  return useContext(FileContext);
}

const FileProvider = ({ children }: { children: any }) => {
  const [files, setFiles] = useState<UploadFileStatus[]>([]);

  return (
    <FileContext.Provider value={{ files, setFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export { FileContext, FileProvider };
