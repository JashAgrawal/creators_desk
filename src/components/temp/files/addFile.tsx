import IconButton from "@/components/common/iconButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import { FaFolderOpen, FaLink } from "react-icons/fa6";
import { IoIosArrowRoundBack, IoIosClose } from "react-icons/io";

const UploadZone = () => {
  return (
    <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
        >
          <input {...getInputProps()} />
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

const ExpandedUploadComp = ()=>{
    const [isLink,setIsLink] = useState(false);
  return (
    <>
    {isLink ?(
    <div className="flex flex-col space-y-3 border shadow-md rounded-lg p-3">
        <div className="flex justify-between items-center">
            <IconButton handleClick={()=>setIsLink(false)} >
            <IoIosArrowRoundBack size={20}/>
            </IconButton>
            <p>Import from Link</p>
            <IconButton handleClick={()=>setIsLink(false)} >
            <IoIosClose onClick={()=>setIsLink(false)} size={20}/>
            </IconButton>
        </div>
        <div>
            <Input placeholder={"https://"}/>
        </div>
        <div className="flex justify-end">
            <Button>Import</Button>
        </div>
    </div>
     ):(
    <div className="flex flex-col space-y-3 border border-gray-100 shadow-md rounded-lg p-4">
      <UploadZone/>
      <div className="my-1.5"></div>
    <div className="flex space-x-6  rounded-lg items-center p-1.5 px-3 hover:bg-gray-200">
        <FaFolderOpen/>
        <p>From device</p>
    </div>
    <div className="flex space-x-6 rounded-lg items-center p-1.5 px-3 hover:bg-gray-200" onClick={()=>setIsLink(true)}>
        <FaLink />
        <p>From link</p>
    </div>
    <div className="my-1.5"></div>
    <div className="text-center rounded-lg p-1.5 px-3 bg-gray-200 hover:bg-red-100">
        <p className="text-sm">Cancel</p>
    </div>
    </div>
    )}
    </>
  )
}

export function UploadFile() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Files</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Add files</DialogTitle>
          <DialogDescription>Add files to your project .</DialogDescription>
        </DialogHeader>
        <ExpandedUploadComp/>
      </DialogContent>
    </Dialog>
  );
}
