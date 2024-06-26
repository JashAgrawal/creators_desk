import { postAPi } from "@/api/apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useOrg } from "@/contexts/org";
import { useProject } from "@/contexts/project";
import { useAuth } from "@/contexts/useAuth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateProject = () => {
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState("");
  const { currentUser } = useAuth();
  const [description, setDescription] = React.useState("");
  const navigate = useNavigate();
  const { org } = useOrg();
  const { setProject } = useProject();
  const handleSubmit = async () => {
    try {
      const project = await postAPi("/create-project", {
        name,
        description,
        organizationId: org.id || "6622f79b38c774132019d87c",
        userId: currentUser?.uid,
      });
      setProject({
        id: project.data.project._id,
        name: project.data.project.name,
      });
      toast("Project Created", {
        description: "You can now add members to your project.",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast("Something went wrong");
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center p-12">
      {step == 0 && (
        <div className="h-full flex flex-col space-y-4 justify-between items-center">
          <h1 className="text-7xl">
            Let's get started with your{" "}
            <span className="font-medium">Project Name</span>
          </h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-0 border-b text-7xl my-3 py-3 focus:outline-none font-semibold"
          />
          <div className="w-full flex justify-end items-end">
            <Button
              className="w-auto h-auto py-4 px-8"
              onClick={() => setStep(1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {step == 1 && (
        <div className="w-full h-full flex flex-col space-y-4 justify-between">
          <h1 className="text-4xl">
            Tell us something more about your project
            <br />
            <span className="font-medium font-6xl"> {name}</span>
            <br />
            <p className="text-lg text-gray-400 mt-2">
              ( You can Skip this step )
            </p>
          </h1>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={12}
            placeholder="Type your message here."
          />
          <div className="w-full flex justify-end items-end">
            <Button
              className="w-auto h-auto py-4 px-8"
              onClick={() => {
                handleSubmit();
              }}
            >
              Create
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProject;
