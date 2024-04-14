import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { FaCheck, FaInfo } from "react-icons/fa6";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Label } from "../../ui/label";
import SubHeading from "../../common/subHeading";
import { CiEdit } from "react-icons/ci";
import { ConfirmAlert } from "../../common/confirm";
const SmallCard = ({
  children,
  heading,
  headingTooptip,
}: {
  children: any;
  heading: string;
  headingTooptip?: string;
}) => {
  return (
    <div className="border p-2 px-3 rounded-md bg-white shadow-md w-full">
      <SubHeading text={heading} toolTipText={headingTooptip} />
      <p className="text-md font-semibold flex items-center space-x-2 mt-1.5">
        {children}
      </p>
    </div>
  );
};
const DashboardBanner = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <CardTitle>
              <h1>Project Home</h1>
            </CardTitle>
            <CardDescription>
              Something about this project ........
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="p-1.5 border rounded-full hover:bg-gray-500">
              <FaInfo size={16} />
            </div>
            <div className="p-1.5 border rounded-full hover:bg-gray-500">
              <CiEdit />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <SmallCard heading="Status" headingTooptip="See current Status">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-md"></div>
            <p>Ready</p>
          </SmallCard>

          <SmallCard
            heading="Collabrators"
            headingTooptip="See current Collabrators"
          >
            <Avatar className="w-4 h-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Label>Jash</Label>,
            <Avatar className="w-4 h-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Label>Jash </Label> ...
          </SmallCard>

          <SmallCard heading="Status" headingTooptip="See current Status">
            <p className="text-gray-500">2 Approvals Pending</p>
          </SmallCard>

          <SmallCard heading="Scope" headingTooptip="See Approved Scope">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-md"></div>
            <p className="text-gray-400 text-sm">Not set yet</p>
          </SmallCard>

          <SmallCard heading="Cost" headingTooptip="See costing details">
            <p>$ 100</p>
          </SmallCard>

          <SmallCard
            heading="Timeline"
            headingTooptip="See timeline defined for the project"
          >
            <p className="text-gray-500">2 months</p>
          </SmallCard>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-end">
        <ConfirmAlert actionMessage="Are you absolutely sure you want to start the upload ?">
          <Button>View Details</Button>
        </ConfirmAlert>
      </CardFooter>
    </Card>
  );
};

export default DashboardBanner;
