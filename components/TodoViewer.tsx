import { cn } from "@/utils/cn";
import finishedSubTasks from "@/utils/subTasks/finishedSubTasks";
import outOfTen from "@/utils/outOfTen";
import parseDate from "@/utils/parseDate";
import ratioSubTasks from "@/utils/subTasks/ratioSubTasks";
import {
  ArrowUp as ArrowUpIcon,
  Calendar as CalendarIcon,
  Move as MoveIcon,
  ListChecks as ListChecksIcon,
  ListTodo as ListTodoIcon,
} from "lucide-react";
import { Todo } from "@/utils/types";
import TodoCardDueDate from "./TodoCard/TodoCardDueDate";

const TodoViewer = ({ t }: { t: Todo }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <h2>{t.name}</h2>
      <h3>{t.description}</h3>
      <div className="space-y-3">
        <p className="pl-[24px] indent-[-24px]">
          <span>
            <CalendarIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            <span className="text-muted-foreground">Due Date: </span>
            <span className="font-medium dark:font-semibold">
              <TodoCardDueDate t={t} />
            </span>
          </span>
        </p>
        <p className="pl-[24px] indent-[-24px]">
          <span>
            <ArrowUpIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            <span className="text-muted-foreground">Priority: </span>
            <span className="font-medium dark:font-semibold">
              {outOfTen(t.priority)}
            </span>
          </span>
        </p>
        <p className="pl-[24px] indent-[-24px]">
          <span>
            <MoveIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            <span className="text-muted-foreground">Complexity: </span>
            <span className="font-medium dark:font-semibold">
              {outOfTen(t.complexity)}
            </span>
          </span>
        </p>
        <p className="pl-[24px] indent-[-24px]">
          <span>
            {finishedSubTasks(t) ? (
              <ListChecksIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            ) : (
              <ListTodoIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            )}
            <span className="text-muted-foreground">Subtasks: </span>
            <span
              className={cn(
                "font-medium dark:font-semibold",
                t.isCompleted && "text-muted-foreground line-through"
              )}
            >
              {ratioSubTasks(t)}
            </span>
          </span>
        </p>
        {t.isCompleted && (
          <p className="text-sm text-muted-foreground italic">
            Completed: {parseDate(t.completedAt).str}
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoViewer;
