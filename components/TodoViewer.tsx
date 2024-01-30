"use client";

import { cn } from "@/utils/cn";
import finishedSubTasks from "@/utils/subTasks/finishedSubTasks";
import outOfTen from "@/utils/outOfTen";
import parseDate from "@/utils/parseDate";
import ratioSubTasks from "@/utils/subTasks/ratioSubTasks";
import {
  ArrowUp as ArrowUpIcon,
  Calendar as CalendarIcon,
  Check as CheckIcon,
  Move as MoveIcon,
  ListChecks as ListChecksIcon,
  ListTodo as ListTodoIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Todo } from "@/utils/types";
import TodoCardDueDate from "./TodoCard/TodoCardDueDate";
import { Separator } from "./ui/separator";
import TagBadge from "./TagBadge";
import { useTodo } from "@/providers/TodoProvider";

type Props = {
  t: Todo;
  mode: "view" | "power";
};

const TodoViewer = ({ t, mode }: Props) => {
  const { dispatch } = useTodo();

  return (
    <>
      <h2 className="text-3xl font-semibold">{t.name}</h2>
      {t.description && (
        <>
          <Separator className="mt-2 mb-1" />
          <h3 className="text-muted-foreground">{t.description}</h3>
          <Separator className="mt-2 mb-4" />
        </>
      )}
      {!t.description && <Separator className="mt-2 mb-4" />}
      <div className="flex flex-wrap mb-4 ml-4">
        {t.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
      <div className="space-y-3 mb-[6rem] md:mb-0">
        <p className="pl-[24px] indent-[-24px] ml-4">
          <span>
            <CalendarIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            <span className="text-muted-foreground">Due Date: </span>
            <span className="font-medium dark:font-semibold">
              <TodoCardDueDate t={t} />
            </span>
          </span>
        </p>
        <p className="pl-[24px] indent-[-24px] ml-4">
          <span>
            <ArrowUpIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            <span className="text-muted-foreground">Priority: </span>
            <span className="font-medium dark:font-semibold">
              {outOfTen(t.priority)}
            </span>
          </span>
        </p>
        <p className="pl-[24px] indent-[-24px] ml-4">
          <span>
            <MoveIcon className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            <span className="text-muted-foreground">Complexity: </span>
            <span className="font-medium dark:font-semibold">
              {outOfTen(t.complexity)}
            </span>
          </span>
        </p>
        <p className="pl-[24px] indent-[-24px] ml-4">
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
        {t.subTasks.map((st, idx) => (
          <div
            key={st + idx.toString()}
            className="flex justify-between my-4 py-2 items-center rounded-full border-2 dark:border hover:ring-ring hover:ring-2 transition-colors"
          >
            <div>
              <p className="ml-8">{`${idx + 1}. ${st.subTaskName}`}</p>
            </div>
            <div className="min-w-[2rem] ml-2 mr-2 md:mr-0">
              <span>
                <Button
                  className={cn(
                    "h-8 w-8 p-0 md:mr-2 rounded-full",
                    st.isCompleted && "bg-green-600 hover:bg-green-500"
                  )}
                  variant="outline"
                  type="button"
                  disabled={mode === "view"}
                  onClick={() => {
                    const editedTodo = t;
                    editedTodo.subTasks = t.subTasks.toSpliced(idx, 1, {
                      subTaskName: st.subTaskName,
                      isCompleted: !st.isCompleted,
                    });
                    dispatch({ cmd: "EDIT_TODO", editedTodo });
                  }}
                >
                  <CheckIcon className="w-4 h-4" />
                </Button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoViewer;
