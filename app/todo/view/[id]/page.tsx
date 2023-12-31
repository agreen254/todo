"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import TodoNotFound from "@/components/TodoNotFound";

const ViewTodo = ({ params: { id } }: { params: { id: string } }) => {
  const {
    todoState: { all },
  } = useContext(TodoContext);

  const t = all.find((ele) => ele.id === id);

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
