import CustomAvatar from "@/components/common/Avatar";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import AddComment from "./addComment";
import classNames from "classnames";
const Comment = ({
  isActive,
  setIsActive,
  replies = [],
  isCompletedProp = false,
}: {
  isActive: boolean;
  setIsActive: any;
  replies?: any[];
  isCompletedProp?: boolean;
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [activeReply, setActiveReply] = useState<number>(-1);
  const [viewReply, setViewReply] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isCompletedProp);
  return (
    <div
      className={classNames(`px-2 py-3 flex flex-col border-y w-full pr-4`, {
        "border-l-4 border-indigo-800": isHover || isActive,
      })}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={() => setIsActive()}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-2 items-center">
          <CustomAvatar />
          <p className="font-semibold">Jane Doe</p>
          <p>2w</p>
        </div>
        {(isHover || isActive || isCompleted) && (
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => setIsCompleted(!isCompleted)}
          />
        )}
      </div>
      <div className="my-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dumm
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <p
            className="text-gray-400 text-sm"
            onClick={() => setIsReplying(!isReplying)}
          >
            {isReplying ? "Cancel" : "Reply"}
          </p>
          <p>
            <AiOutlineLike color="gray" />
          </p>

          {replies.length > 0 && (
            <p
              className="text-indigo-800 text-sm mx-2"
              onClick={() => setViewReply(!viewReply)}
            >
              {viewReply ? "Hide" : "View"} 2 replies
            </p>
          )}
        </div>
        {(isHover || isActive) && <MdDeleteOutline />}
      </div>

      <div className="ml-5">
        {viewReply && (
          <>
            <AddComment placeholder="Reply to this comment" />
            {replies.map((x, i) => (
              <Comment
                key={i}
                isActive={activeReply === i}
                setIsActive={() => {
                  setActiveReply(activeReply !== i ? i : -1);
                }}
              />
            ))}
          </>
        )}
      </div>

      {isReplying && (
        <div className="ml-3">
          <AddComment />
        </div>
      )}
    </div>
  );
};

export default Comment;
