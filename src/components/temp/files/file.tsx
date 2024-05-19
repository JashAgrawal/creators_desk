import { Button } from "@/components/ui/button";
import { FaFile } from "react-icons/fa";
export default function File({ file }: { file: any }) {
  return (
    <a href={file.url} target="_blank">
      <Button
        variant="outline"
        className="text-truncate w-100 border-gray-400 bg-gray-200"
      >
        <FaFile className="mr-2" />
        {file.name}
      </Button>
    </a>
  );
}
