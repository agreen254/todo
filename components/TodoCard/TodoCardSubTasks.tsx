import ratioSubTasks from "@/utils/subTasks/ratioSubTasks";
import { ListChecks as ListChecksIcon } from "lucide-react";
import { Todo } from "@/utils/types";

const TodoCardSubTasks = ({ t }: { t: Todo }) => {
  return (
    <p className="pl-[24px] indent-[-24px]">
      <span>
        <ListChecksIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
        <span className="text-muted-foreground">Subtasks: </span>
        <span className="font-medium dark:font-semibold">
          {ratioSubTasks(t)}
        </span>
      </span>
    </p>
  );
};

export default TodoCardSubTasks;
