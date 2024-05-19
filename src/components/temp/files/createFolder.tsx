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
import { FOLDER, useRoot } from "@/contexts/root";
import { useAuth } from "@/contexts/useAuth";
import { AddRecords } from "@/services/database";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

export function CreateFolder({ currentFolder }: { currentFolder: FOLDER }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  const { ROOT_FOLDER } = useRoot();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-indigo-600">
          New Folder
        </Button>
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
            let path: any = [];
            if (currentFolder.id !== ROOT_FOLDER.id) {
              path = [
                ...currentFolder.path,
                { name: currentFolder.name, id: currentFolder.id },
              ];
            }
            console.log({
              name: name,
              parentId: currentFolder.id,
              userId: currentUser?.uid,
              path: path,
              createdAt: Timestamp.now(),
            });
            AddRecords("folders", {
              name: name,
              parentId: currentFolder.id,
              userId: currentUser?.uid,
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

          <div className="w-full flex justify-between items-center mt-6">
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
