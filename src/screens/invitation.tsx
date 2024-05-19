import { acceptInviteApi, getInviteById } from "@/api/apis";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";
import React, { useEffect, useState } from "react";
import {
  redirect,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "sonner";

const Invitation = () => {
  const [name, setName] = useState("");
  const query = useSearchParams();
  const params = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getInviteDetails(params?.inviteId);
  }, [query, params, currentUser]);
  const acceptInvite = async () => {
    try {
      if (currentUser === null) return;
      const res = await acceptInviteApi({
        email: currentUser?.email,
        inviteToken: query[0].get("inviteToken"),
      });
      toast("You have Joined " + name);
      navigate("/");
    } catch (e) {
      navigate("/not-valid-invite");
      toast("Invite Not Valid");
      console.log(e);
    }
  };
  const getInviteDetails = async (id: string | undefined) => {
    try {
      if (id) {
        const invite = await getInviteById(id);
        setName(invite.data.entityName);
      }
    } catch (e) {
      navigate("/not-valid-invite");
      toast("Invite Not Found");
      console.log(e);
    }
  };
  return (
    <div className="p-6 rounded-lg border border-green-600 flex flex-col space-y-2 justify-center items-center">
      <h1>You have a invitiation to join {name}</h1>
      <p>Would you like to accept the invitiation ? </p>
      <Button className="mt-12 px-6 py-4 text-xl" onClick={acceptInvite}>
        Accept
      </Button>
    </div>
  );
};

export default Invitation;
