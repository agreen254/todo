"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";
import { TodoFormData } from "@/validation/schema";
import { todoFormDefaults } from "@/validation/schema";
import { Todo } from "@/utils/types";
import ThemeToggle from "@/components/ThemeToggle";
import { redirect } from "next/navigation";

const DynamicTodoForm = dynamic(() => import("@/components/Forms/TodoForm"), {
  ssr: false,
});

type Props = {
  params: { id: string };
};

const EditTodo = ({ params: { id } }: Props) => {
  const {
    state: { todos },
  } = useContext(TodoContext);
  const t = todos.find((t) => t.id === id);

  const extractDefaultValues = (t: Todo | undefined) => {
    if (!t) return todoFormDefaults;
    const dueDate = t.dueAt ? new Date(t.dueAt) : undefined;

    const defaults: Partial<TodoFormData> = {
      name: t.name,
      description: t?.description,
      dueAt: dueDate,
      priority: t.priority,
      complexity: t.complexity,
      isCompleted: t.isCompleted,
      isPinned: t.isPinned,
      tags: t.tags,
      subTasks: t.subTasks.map((st) => st.subTaskName),
      completedSubTasks: t.subTasks.map((st) => st.isCompleted),
      id: t.id,
    };
    return defaults;
  };

  // if (!t) redirect("/");
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full justify-evenly items-center mt-10 mx-8">
        <div />
        <Link href="/" tabIndex={-1}>
          <Button
            className="hover:scale-110 transition-all w-[50px] h-[50px]"
            variant="outline"
            size="icon"
            role="link"
          >
            <ArrowLeftIcon
              className="w-6 h-6"
              stroke="hsl(var(--secondary-foreground))"
            />
          </Button>
        </Link>
        <h1 className="font-bold text-2xl text-muted-foreground">Edit To-Do</h1>
        <div>
          <ThemeToggle />
        </div>
        <div />
      </div>
      <DynamicTodoForm defaultValues={extractDefaultValues(t)} />
    </div>
  );
};

export default EditTodo;
