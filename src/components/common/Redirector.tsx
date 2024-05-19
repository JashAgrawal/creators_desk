import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const Redirector = ({ to, message }: { to: string; message?: string }) => {
  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, []);
  return <Navigate to={to} replace />;
};

export default Redirector;
