import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { router } from "./router/index.tsx";
import Header from "./components/common/header.tsx";
import Sidebar, { SidebarItem } from "./components/common/leftMenu.tsx";
import { IoAddCircle } from "react-icons/io5";
import { useExpanded } from "./contexts/sidebar.tsx";
import { AuthProvider } from "./contexts/useAuth.tsx";
const Loading = () => (
  <div className="w-screen h-screen flex justify-center items-center bg-black">
    <div className="w-96 h-96 flex justify-center items-center bg-white shadow-lg shadow-gray-600">
      Loading...
    </div>
  </div>
);
const App = () => {
  const { expanded } = useExpanded();
  return (
    <div className="flex flex-col w-screen h-screen overflow-x-hidden">
      <Toaster />
      <Header />
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<IoAddCircle size={26} color="#3b82f6" />}
            text="Add People"
            active
          />
          <SidebarItem
            icon={<IoAddCircle size={26} color="#3b82f6" />}
            text="Add People"
            alert
          />
        </Sidebar>
      </div>
      <div
        className="overflow-x-hidden"
        style={{ marginLeft: expanded ? "13.3rem" : "3.6rem" }}
      >
        <AuthProvider>
        <RouterProvider router={router} fallbackElement={<Loading />} />
        </AuthProvider>
      </div>
    </div>
  );
};

export default App;
