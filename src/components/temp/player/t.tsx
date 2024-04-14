import CustomAvatar from "@/components/common/Avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

const CommentsBar = ({ fullDuration }: { fullDuration: number }) => {
  const [comments, setComments] = useState<
    { timestamp: number; text: string; length: number }[]
  >([
    {
      timestamp: 12,
      text: "This shot goes on a bit long, ar putting titles here?",
      length: 5,
    },
    {
      timestamp: 8,
      text: "This shot goes on a bit short",
      length: 1,
    },
  ]);
  return (
    <div className="w-full relative h-8 mt-1.5 bg-gray-200">
      {comments.map((comment) => (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger
              style={{
                left: `${Math.floor(
                  (comment.timestamp / fullDuration) * 100
                )}%`,
              }}
              className={cn("absolute top-0.5")}
            >
              <div className="flex items-center">
                <CustomAvatar />
                <div
                  className="bg-red-600 h-1 w-64 rounded-r-full"
                  style={{ width: `${comment.length * 10}px` }}
                ></div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-white text-black  border">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <CustomAvatar size={1} />
                  <p className="font-semibold">Shadcn</p>
                  <p>12:00 am</p>
                </div>
                <div>
                  <p>{comment.text}</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default CommentsBar;
