import FileUploader from "@/components/temp/mediaupload/firebase";
import { useRoot } from "@/contexts/root";
import { useFolder } from "@/contexts/useFolder";
import React from "react";

const UploadToCloud = () => {
  const { folder } = useFolder();
  const { ROOT_FOLDER } = useRoot();
  return (
    <div>
      <FileUploader currentFolder={folder?.id == "" ? ROOT_FOLDER : folder} />
    </div>
  );
};

export default UploadToCloud;
