import CustomAvatar from "@/components/common/Avatar";
import React from "react";

const AddComment = ({ placeholder }: { placeholder?: string }) => {
  return (
    <div className="flex space-x-2 items-center p-2">
      <CustomAvatar size={1.5} />
      <textarea
        // type="text"
        placeholder={placeholder || "Add Comment ...."}
        className="w-full h-12 p-2 border-b text-sm border-gray-400 "
      />
    </div>
  );
};

export default AddComment;
