import Comment from "@/components/temp/comments";
import AddComment from "@/components/temp/comments/addComment";
import CustomVideoPlayer from "@/components/temp/player";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Player = () => {
  const [active, setActive] = useState<number>(-1);
  return (
    <div className="flex h-[90vh] w-full">
      <div className="w-2/3 h-full flex flex-col justify-center items-center">
        <div className="flex items-center w-full h-full justify-between space-x-2 px-2">
          {/* <div className="p-2 rounded-full border hover:bg-gray-300 flex justify-center items-center">
            <FaChevronLeft />
          </div> */}
          <div className="w-full h-full flex justify-center items-center">
            <CustomVideoPlayer />
          </div>
          {/* <div className="p-2 rounded-full border hover:bg-gray-300 flex justify-center items-center">
            <FaChevronRight />
          </div> */}
        </div>
      </div>

      <div className="w-1/3 border overflow-hidden">
        <div className="border-b">
          <AddComment />
        </div>

        <ScrollArea className="h-full pb-16 overflow-y-auto">
          {[1, 2, 34, 4].map((x, i) => (
            <Comment
              key={i}
              isActive={active === i}
              setIsActive={() => {
                setActive(active !== i ? i : -1);
              }}
              replies={[1, 2]}
            />
          ))}
          {/* </div> */}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Player;
