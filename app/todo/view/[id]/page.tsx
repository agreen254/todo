"use client";

import { useEffect, useState } from "react";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import TodoViewer from "@/components/TodoViewer";
import TodoNotFound from "@/components/Errors/TodoNotFound";
import { useTodo } from "@/providers/TodoProvider";

type Props = {
  params: { id: string };
};

const ViewTodo = ({ params: { id } }: Props) => {
  const {
    state: { todos },
  } = useTodo();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const t = todos.find((t) => t.id === id);

  return (
    <div>
      <div className="flex w-[calc(100vw-4rem)] justify-evenly items-center mt-10 mx-8">
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
        <h1 className="font-bold text-2xl text-muted-foreground">View To-Do</h1>
        <div>
          <ThemeToggle />
        </div>
        <div />
      </div>
      {isMounted &&
        (t ? (
          <div className="w-full flex justify-center">
            <div className="w-[min(640px,90vw)] mt-8 h-full flex flex-col justify-start">
              <TodoViewer t={t} mode="view" />
            </div>
          </div>
        ) : (
          <TodoNotFound />
        ))}
    </div>
  );
};

export default ViewTodo;
