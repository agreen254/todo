"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import PinnedTodoCard from "./PinnedTodoCard";

const PinnedTodos = () => {
  const {
    todoState: { pinned },
  } = useContext(TodoContext);

  return pinned.map((t) => (
    <PinnedTodoCard
      key={t.id + "pinned"}
      t={t}
      className="min-w-[80vw] md:min-w-[20vw] md:max-w-[30vw] mx-4 my-4"
    />
  ));
};

export default PinnedTodos;
