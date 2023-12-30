"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import TodoCard from "./TodoCard";

const CompletedTodos = () => {
  const {
    todoState: { completed },
  } = useContext(TodoContext);

  return completed.map((t) => (
    <TodoCard
      key={t.id + "complete"}
      t={t}
      className="min-w-[80vw] md:min-w-[20vw] md:max-w-[30vw] mx-4 my-4"
    />
  ));
};

export default CompletedTodos;
