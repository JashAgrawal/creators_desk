import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlayIcon } from "lucide-react";
//@ts-ignore
import VideoThumbnail from "react-video-thumbnail";

interface MediaPreviewProps {
  files: File[];
}

const CustomVideoThumbnail = ({ file }: { file: File }) => {
  const [thumbnail, setThumbnail] = useState("");
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-[40%] left-[40%]">
        <div className="rounded-full w-10 h-10 bg-black bg-opacity-40 flex justify-center items-center border border-white">
          <PlayIcon color="white" size={20} />
        </div>
      </div>
      <VideoThumbnail
        videoUrl={URL.createObjectURL(file)}
        thumbnailHandler={(thumbnail: any) => setThumbnail(thumbnail)}
        renderThumbnail={false}
        snapshotAtTime={5}
      />
      <img
        src={thumbnail}
        alt={file.name}
        className="border-2 w-44 h-44 rounded-md object-cover"
      />
    </div>
  );
};

const MediaPreview: React.FC<MediaPreviewProps> = ({ files }) => {
  const isVideo = (file: File) => file.type.startsWith("video/");

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-6 gap-1">
          {files.map((file, index) => (
            <div key={index} className="relative">
              {isVideo(file) ? (
                <CustomVideoThumbnail file={file} />
              ) : (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="border-2 w-44 h-44 rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaPreview;
