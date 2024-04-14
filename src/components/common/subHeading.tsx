import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { CiCircleInfo } from "react-icons/ci";

const SubHeading = ({
  text,
  toolTipText,
}: {
  text: string;
  toolTipText?: string;
}) => {
  return (
    <div className="flex items-center pb-1 border-b">
      <h1 className="font-semibold">{text}</h1>
      {toolTipText && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="pl-1.5">
                <CiCircleInfo />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{toolTipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default SubHeading;
