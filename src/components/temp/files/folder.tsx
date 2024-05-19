import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaFolder } from "react-icons/fa";

export default function Folder({ folder }: { folder: any }) {
  return (
    <Link to={`/files/${folder.id}`}>
      <Button
        variant="outline"
        className="text-truncate w-100 border-gray-400 bg-gray-200"
      >
        <FaFolder className="mr-2" />
        {folder.name}
      </Button>
    </Link>
  );
}
