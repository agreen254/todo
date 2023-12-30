"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import TodoCard from "./TodoCard";

const PendingTodos = () => {
  const {
    todoState: { pending },
  } = useContext(TodoContext);

  return pending.map((t) => (
    <TodoCard
      key={t.id + "pending"}
      t={t}
      className="min-w-[80vw] md:min-w-[20vw] md:max-w-[30vw] mx-4 my-4"
    />
  ));
};

export default PendingTodos;
