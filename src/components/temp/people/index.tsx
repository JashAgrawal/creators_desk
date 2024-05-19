import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoAddCircle } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import Sidebar, { SidebarItem } from "@/components/common/leftMenu";
import { createInvite } from "@/api/apis";
import { projId, projName } from "@/contexts/constants";
const PeopleCard = ({
  name,
  email,
  id,
  image,
}: {
  name: string;
  email?: string;
  id?: string;
  image?: string;
}) => (
  <div className="flex items-center space-x-6 border-b py-3">
    <Avatar>
      <AvatarImage
        src={image || "https://github.com/shadcn.png"}
        alt="@shadcn"
      />
      <AvatarFallback>{name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
    </Avatar>
    <div className="flex flex-col space-y-0.5">
      <h3 className="capitalize font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-600">{email}</p>
    </div>
  </div>
);
const PeoplesSection = ({
  heading,
  data,
}: {
  heading: string;
  data: any[];
}) => (
  <AccordionItem value={heading} className="border-green-500">
    <AccordionTrigger className="p-3 border-b-2 border-green-500 flex space-x-3 hover:no-underline">
      <h1 className="text-2xl font-semibold tracking-wide text-green-500">
        {heading.toLocaleUpperCase()}
      </h1>
    </AccordionTrigger>
    <AccordionContent className="flex flex-col">
      {data.map((person, idx) => (
        <PeopleCard
          key={"" + idx + person}
          name="Jash Agrawal"
          email="jash@jash.com"
          image="https://github.com/shadcn.png"
        />
      ))}
    </AccordionContent>
  </AccordionItem>
);

const CreateInviteLink = ({
  role,
  setRole,
  email,
  setEmail,
}: {
  role: string;
  setRole: any;
  email: string;
  setEmail: any;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Select
        defaultValue={role}
        onValueChange={(value: any) => setRole(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {["Admin", "Client", "Editor", "Manager"].map((role, idx) => (
            <SelectItem value={role} key={idx}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const People = () => {
  const [role, setRole] = useState("Editor");
  const [email, setEmail] = useState("");

  const sendInvite = async () => {
    const res = await createInvite({
      email,
      role,
      entityName: projName,
      projectId: projId,
    });
    console.log(res);
  };
  return (
    <>
      <div className="w-full h-full flex flex-col space-y-6">
        <div className="p-4 border-b-2 border-blue-500 w-full flex justify-between">
          <h1 className="text-3xl font-bold text-blue-500">
            Manage People Here
          </h1>
          <Sheet>
            <SheetTrigger>
              <IoAddCircle size={40} color="#3b82f6" />
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle>Add New People</SheetTitle>
                <SheetDescription>
                  Make changes to your Project's/Organisation's People here.
                  Click send when you're done.
                </SheetDescription>
              </SheetHeader>
              <div>
                <CreateInviteLink
                  role={role}
                  setRole={setRole}
                  email={email}
                  setEmail={setEmail}
                />
              </div>
              <SheetFooter className="flex flex-col h-full justify-between items-end">
                <SheetClose>
                  <Button>Cancel</Button>
                </SheetClose>
                <SheetClose>
                  <Button onClick={() => sendInvite()}>Send Invite</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <Accordion type="single" collapsible defaultValue="Clients">
          <PeoplesSection heading="OWNER" data={[1]} />
          <PeoplesSection heading="Clients" data={[1, 2]} />
          <PeoplesSection heading="Editors" data={[1, 2]} />
        </Accordion>
      </div>
    </>
  );
};

export default People;
