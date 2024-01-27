import finishedSubTasks from "@/utils/subTasks/finishedSubTasks";
import ratioSubTasks from "@/utils/subTasks/ratioSubTasks";
import {
  ListChecks as ListChecksIcon,
  ListTodo as ListTodoIcon,
} from "lucide-react";
import { Todo } from "@/utils/types";

const TodoCardSubTasks = ({ t }: { t: Todo }) => {
  const handleDisplay = () => {
    if (finishedSubTasks(t)) {
      return (
        <span className="text-muted-foreground line-through font-medium dark:font-semibold">
          {ratioSubTasks(t)}
        </span>
      );
    } else if (!!t.subTasks.length) {
      return (
        <span className="font-medium dark:font-semibold">
          {ratioSubTasks(t)}
        </span>
      );
    } else if (!!!t.subTasks.length) {
      return <span className="italic">none</span>;
    }
  };
  return (
    <p className="pl-[24px] indent-[-24px]">
      <span>
        {finishedSubTasks(t) ? (
          <ListChecksIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
        ) : (
          <ListTodoIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
        )}
        <span className="text-muted-foreground">Subtasks: </span>
        {handleDisplay()}
      </span>
    </p>
  );
};

export default TodoCardSubTasks;
