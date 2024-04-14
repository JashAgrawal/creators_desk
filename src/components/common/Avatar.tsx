import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CustomAvatar = ({ size }: { size?: number }) => {
  const sizee = size ? size : 1.75;
  return (
    <Avatar
      className={`w-7 h-7`}
      style={{ width: `${sizee}rem`, height: `${sizee}rem` }}
    >
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
