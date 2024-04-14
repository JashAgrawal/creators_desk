import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

const Tasks = () => {
  return (
    <div className="flex flex-col">
      {[1, 2, 3, 4, 5, 6, 7, 78, 9].map((task, i) => (
        <div className="flex p-2 py-3 mb-2 space-x-2 border border-gray-400 rounded-md">
          <Checkbox key={i} />
          <Label>Task {task}</Label>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
