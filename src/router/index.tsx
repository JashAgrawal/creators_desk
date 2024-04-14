import Auth from "@/components/auth/auth";
import People from "@/components/temp/people";
import Player from "@/screens/player";
import UploadToCloud from "@/screens/uploadToCloud";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Player />,
  },
  { path: "/auth", element: <Auth /> },
  { path: "/people", element: <People /> },
  { path: "/upload-file", element: <UploadToCloud /> },
]);
