import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import MediaPreview from "./preview";

const UploadMediaCard = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleUpload = () => {
    // Handle file upload logic here
    console.log("Uploading files:", files);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
      </CardHeader>
      {files.length > 0 && (
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <MediaPreview files={files} />
            </CardContent>
          </Card>
        </CardContent>
      )}
      <CardContent>
        <Label htmlFor="media-upload">
          <Input
            id="media-upload"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            multiple
          />
        </Label>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={files.length === 0}>
          <Upload /> Upload
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UploadMediaCard;
