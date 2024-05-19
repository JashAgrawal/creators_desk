import IconButton from "@/components/common/iconButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { FaRegCheckCircle, FaUpload } from "react-icons/fa";
import { FaFolderOpen, FaLink } from "react-icons/fa6";
import { IoIosArrowRoundBack, IoIosClose } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import useFileUploader, {
  UploadFile,
  UploadFileStatus,
} from "../mediaupload/firebase";
import { v4 as uuidv4 } from "uuid";
import { useFiles } from "@/contexts/files";
const UploadZone = () => {
  const { setFiles, handleFileChange } = useFileUploader();
  const handleDrop = (acceptedFiles: any) => {
    const filesArr: UploadFileStatus[] = acceptedFiles.map((file: any) => ({
      id: uuidv4(),
      name: file.name,
      progress: 0,
      error: false,
      status: "Pending",
      file,
    }));
    setFiles((prevFilesToUpload: UploadFileStatus[]) => [
      ...prevFilesToUpload,
      ...filesArr,
    ]);
  };
  return (
    <Dropzone onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input
            {...getInputProps()}
            // ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="flex flex-col space-y-3 justify-center items-center p-8 border border-dashed rounded-lg">
            <div className="p-6 rounded-full bg-gray-200">
              <FaUpload size={18} />
            </div>
            <h1>Drop files Here</h1>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const ExpandedUploadComp = () => {
  const [isLink, setIsLink] = useState(false);
  const { openFileSelect, handleUpload, files } = useFileUploader();
  return (
    <>
      {isLink ? (
        <div className="flex flex-col space-y-3 border border-gray-200 shadow-md rounded-lg p-3">
          <div className="flex justify-between items-center">
            <IconButton handleClick={() => setIsLink(false)}>
              <IoIosArrowRoundBack size={20} />
            </IconButton>
            <p>Import from Link</p>
            <IconButton handleClick={() => setIsLink(false)}>
              <IoIosClose onClick={() => setIsLink(false)} size={20} />
            </IconButton>
          </div>
          <div>
            <Input placeholder={"https://youtube.com/...."} />
          </div>
          <div className="flex justify-end">
            <Button>Import</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-3 border border-gray-300 shadow-md rounded-lg p-4">
          <UploadZone />
          <div className="my-1.5"></div>
          <div
            onClick={openFileSelect}
            className="flex space-x-6  rounded-lg items-center p-1.5 px-3 hover:bg-gray-200"
          >
            <FaFolderOpen />
            <p>From device</p>
          </div>
          <div
            className="flex space-x-6 rounded-lg items-center p-1.5 px-3 hover:bg-gray-200"
            onClick={() => setIsLink(true)}
          >
            <FaLink />
            <p>From link</p>
          </div>
          <div className="my-1.5"></div>
          <div
            onClick={() => handleUpload()}
            className="text-center rounded-lg p-1.5 px-3 bg-gray-200 hover:bg-green-200"
          >
            <p className="text-sm">Upload</p>
          </div>
        </div>
      )}
    </>
  );
};
const UploadedFile = ({
  id,
  name,
  file,
  error,
  progress,
}: {
  id: string;
  name: string;
  file: File;
  error: boolean;
  progress: number;
}) => {
  const { files, setFiles } = useFiles();
  return (
    <>
      <div className="relative overflow-hidden border border-dashed border-gray-400 px-3 py-2 rounded-lg">
        <div
          className={classNames(
            "absolute top-0 left-0 bottom-0 bg-green-200 -z-10 m-[1%] rounded-md"
          )}
          style={{ width: `${progress - 2}%` }}
        ></div>
        <div className="flex items-center z-10 space-x-3  w-full justify-start">
          <div className="relative w-24 h-10">
            <img
              src={"/pep.jpg"}
              alt={name}
              className="rounded-lg w-20 h-10 object-cover"
            />
            {progress == 100 && (
              <div className="absolute -top-1.5 -right-1.5">
                {!error ? (
                  <FaRegCheckCircle color="green" size={20} />
                ) : (
                  <div className="rounded-full w-5 h-5 p-[0.2rem] bg-gray-200 flex justify-center items-center border border-red-500">
                    <RxCross1 color="red" size={16} />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="rounded-lg">
            <p>{name}</p>
          </div>
          <div className="w-full"></div>
          <p
            className="cursor-pointer"
            onClick={() => {
              setFiles(files.filter((file) => file.id !== id));
            }}
          >
            <RxCross1 />
          </p>
        </div>
      </div>
    </>
  );
};

export function UploadFileComp() {
  const [open, setOpen] = useState(false);
  const { files, setFiles } = useFileUploader();
  useEffect(() => {
    setFiles([]);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-indigo-500">
          Upload Files
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Add files</DialogTitle>
          <DialogDescription>Add files to your project .</DialogDescription>
        </DialogHeader>
        <div className="flex space-x-3">
          <div className="w-1/2">
            <ExpandedUploadComp />
          </div>
          <div className="w-1/2">
            <div className="border border-gray-300 shadow-md rounded-lg h-full p-3 flex flex-col">
              {files.map((file) => (
                <UploadedFile
                  key={file.id}
                  id={file.id}
                  name={file.name}
                  file={file.file}
                  error={file.status === "Failed"}
                  progress={file.progress}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button className="bg-red-500">Cancel</Button>
          </DialogClose>
          <Button>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
