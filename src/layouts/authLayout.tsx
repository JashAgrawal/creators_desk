import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/useAuth";

const AuthLayout = ({ children }: { children: any }) => {
  return <div>{children}</div>;
};

export default AuthLayout;
