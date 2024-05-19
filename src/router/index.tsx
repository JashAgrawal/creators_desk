import Auth from "@/components/auth/auth";
import { Loading } from "@/components/common/loading";
import Redirector from "@/components/common/Redirector";
import DriveHome from "@/components/temp/files/home";
import People from "@/components/temp/people";
import { useAuth } from "@/contexts/useAuth";
import AppLayout from "@/layouts/appLayout";
import CreateOrg from "@/screens/create-org";
import CreateProject from "@/screens/create-project";
import Invitation from "@/screens/invitation";
import InviteNotValid from "@/screens/inviteNotValid";
import Notfound from "@/screens/notfound";
import Player from "@/screens/player";
import UploadToCloud from "@/screens/uploadToCloud";
import { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { toast } from "sonner";

const publicRoutes = [
  { path: "/auth", element: <Auth /> },
  {
    path: "*",
    element: <Redirector to="/auth" message="Please login to continue" />,
  }, // Redirect all unmatched routes to login
];

const protectedRoutes = [
  {
    path: "/",
    element: <Player />,
  },
  { path: "/people", element: <People /> },
  { path: "/upload-file", element: <UploadToCloud /> },
  { path: "/files", element: <DriveHome /> },
  { path: "/files/:folderId", element: <DriveHome /> },
  { path: "/invite/:inviteId", element: <Invitation /> },
  { path: "/create-org", element: <CreateOrg /> },
  { path: "/create-project", element: <CreateProject /> },
  { path: "/not-valid-invite", element: <InviteNotValid /> },
  {
    path: "/auth",
    element: <Redirector to="/" message="Already logged in" />,
  },
  { path: "*", element: <Notfound /> },
];

const appRoutes = protectedRoutes.map((route) => {
  return { ...route, element: <AppLayout>{route.element}</AppLayout> };
});
const appRouter = createBrowserRouter(appRoutes);
const router = createBrowserRouter(publicRoutes);

export const AppRouter = () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <RouterProvider router={appRouter} fallbackElement={<Loading />} />;
  } else {
    return <RouterProvider router={router} fallbackElement={<Loading />} />;
  }
};
