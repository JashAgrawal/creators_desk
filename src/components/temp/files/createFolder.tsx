import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/useAuth";
import { ROOT_FOLDER } from "@/contexts/useFolder";
import { AddRecords } from "@/services/database";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

export function CreateFolder({ currentFolder }: { currentFolder: any }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New Folder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-3xl">New Folder</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (event) => {
            // Create Folder
            event.preventDefault();
            if (currentFolder == null) return;

            const path = [...currentFolder.path];
            if (currentFolder !== ROOT_FOLDER) {
              path.push({ name: currentFolder.name, id: currentFolder.id });
            }
            AddRecords("folders", {
              name: name,
              parentId: currentFolder.id,
              userId: currentUser.uid,
              path: path,
              createdAt: Timestamp.now(),
            });
            setName("");
            setOpen(false);
          }}
        >
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=""
          />

          <div className="w-full flex justify-between items-center">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
