import React, { useEffect } from "react";
import { useFolder } from "@/contexts/useFolder";
import { useLocation, useParams } from "react-router-dom";
import { CreateFolder } from "./createFolder";
import { useRoot } from "@/contexts/root";
import { BreadcrumbDemo } from "./breadcrumbs";
import Folder from "./folder";
import { UploadFileComp } from "./addFile";
import File from "./file";

const DriveHome = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { ROOT_FOLDER } = useRoot();
  const { folder, childFolders, childFiles } = useFolder(
    folderId || ROOT_FOLDER.id,
    state?.folder
  );
  useEffect(() => {
    console.log(childFolders);
  }, [folder]);
  return (
    <div className="pb-8">
      <div className="w-full px-3 py-1.5">
        <BreadcrumbDemo
          currentFolder={folder?.id !== "" ? folder : ROOT_FOLDER}
        />
      </div>
      <div className="flex w-full justify-end items-center p-3 space-x-4">
        {/* <FolderBreadcrumbs currentFolder={folder} /> */}
        {/* <AddFileButton currentFolder={folder} /> */}
        <CreateFolder
          currentFolder={folder?.id !== "" ? folder : ROOT_FOLDER}
        />
        <UploadFileComp />
      </div>
      <div className="flex h-64 border border-indigo-500 rounded-lg mx-3 mb-4">
        {childFolders.length > 0 && (
          <div className="flex flex-wrap space-x-4 p-3">
            {childFolders.map((childFolder: any) => (
              <Folder key={childFolder?.id} folder={childFolder} />
            ))}
          </div>
        )}
      </div>
      <div className="flex h-64 border border-indigo-500 rounded-lg mx-3">
        {childFiles.length > 0 && (
          <div className="flex flex-wrap space-x-4 p-3">
            {childFiles.map((childFile: any) => (
              <File file={childFile} key={childFile?.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriveHome;
