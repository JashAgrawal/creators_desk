import Tasks from "./tasks";
import { TabsDemo } from "./tabs";
import DashboardBanner from "./dashboard";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { FaTasks } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TaskSheetDemo } from "./taskSheet";
const Dashboard = () => {
  return (
    <div className="flex flex-col max-h-[91vh]">
      <TabsDemo />
      <div className="flex space-x-6 p-6">
        <ScrollArea className="w-full border rounded-md p-3 h-[73vh]">
          <DashboardBanner />
          <div className="h-full py-3">
            <h1 className="font-semibold">Pending Approvals</h1>
            <div className="my-2 py-2 border rounded-md flex flex-row items-center space-x-4 overflow-hidden">
              <div className="flex justify-center items-center w-[7%] h-full border-r p-4">
                <FaTasks size={26} />
              </div>
              <div className="w-full">
                <p>Jash Agrawal has created an approval request for you</p>
                <p className="text-sm text-gray-400">
                  {new Date().toISOString().replace("T", " ").split(".")[0]}
                </p>
              </div>
              <div className="px-2">
                <div className="w-10 h-10 rounded-full hover:bg-gray-400 flex justify-center items-center">
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="w-1/4 h-[73vh] border rounded-md p-3">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-semibold">Tasks</h1>
            <TaskSheetDemo>
              <p className="text-blue-500 font-semibold cursor-pointer">
                + New
              </p>
            </TaskSheetDemo>
          </div>
          <ScrollArea className="h-[55vh] my-2 overflow-y-auto pr-3">
            <Tasks />
          </ScrollArea>
          <Button>Approve all and start upload</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
