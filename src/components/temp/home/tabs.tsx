import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyTab = ({ text, value }: { text: string; value: string }) => (
  <TabsTrigger value={value} className="h-12 w-full rounded-b-full">
    {text}
  </TabsTrigger>
);
export function TabsDemo() {
  return (
    <div className="bg-accent  p-1 pb-4 rounded-b-full overflow-hidden">
      <Tabs defaultValue="work" className="w-full bg-accent">
        <TabsList className=" w-full flex justify-evenly items-center space-x-3">
          <MyTab text="Work" value="work" />
          <MyTab text="Files" value="files" />
          <MyTab text="History" value="history" />
          <MyTab text="Dashboard" value="dashboard" />
        </TabsList>
      </Tabs>
    </div>
  );
}
