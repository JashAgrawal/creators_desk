import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function TaskSheetDemo({ children }: { children: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[1000px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Create/Edit Task</SheetTitle>
          <SheetDescription>
            Make changes to your Tasks here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-full bg-gray-300 flex flex-col p-0.5">
          <input className="border-b p-2" placeholder="Enter Task" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
