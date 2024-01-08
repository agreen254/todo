"use client";

import { useContext, useEffect } from "react";
import TodoContext from "@/contexts/TodoContext";
import TodoNotFound from "@/components/Errors/TodoNotFound";

type Props = {
  params: { id: string };
};

const ViewTodo = ({ params: { id } }: Props) => {
  const {
    state: { todos },
  } = useContext(TodoContext);
  const t = todos.find((t) => t.id === id);

  useEffect(() => {
    if (t) {
      document.title = `View: ${t.name}`;
    }
  });

  if (!t) {
    <TodoNotFound />;
  }

  return (
    <div>
      <h1>View Todo</h1>
    </div>
  );
};

export default ViewTodo;
