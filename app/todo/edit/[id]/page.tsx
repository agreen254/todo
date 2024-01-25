"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import TodoNotFound from "@/components/Errors/TodoNotFound";

// dynamic import lets us adjust the document title once the todo name is loaded
// without getting a hydration error
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigLeft as ArrowBigLeftIcon } from "lucide-react";
import { TodoFormData } from "@/validation/schema";
import { todoFormDefaults } from "@/validation/schema";
import { Todo } from "@/utils/types";

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
    const defaults: Partial<TodoFormData> = {};
    return Object.assign(defaults, t);
  };

  if (!t) {
    <TodoNotFound />;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full justify-evenly items-center mt-10 mx-8">
        <div />
        <Button
          className="rounded-full hover:scale-110 transition-all"
          variant="ghost"
          size="icon"
          role="link"
        >
          <Link href="/">
            <ArrowBigLeftIcon
              className="w-8 h-8"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted-foreground))"
            />
          </Link>
        </Button>
        <h1 className="font-bold text-2xl text-muted-foreground">Edit Todo</h1>
        <div />
        <div />
      </div>
      <DynamicTodoForm defaultValues={extractDefaultValues(t)} />
    </div>
  );
};

export default EditTodo;
