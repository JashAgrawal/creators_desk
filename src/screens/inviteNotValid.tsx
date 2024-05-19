import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InviteNotValid = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10 m-8 flex flex-col h-[85%] border-2 rounded-xl border-green-600 justify-center items-center space-y-6">
      <h1 className="text-6xl font-bold">OOPS !</h1>
      <h1 className="text-2xl font-semibold">Invite Not Valid</h1>
      <Button
        className="py-3 px-6 w-auto h-auto mt-12 text-xl"
        onClick={() => navigate(-2)}
      >
        Go Back
      </Button>
    </div>
  );
};

export default InviteNotValid;
