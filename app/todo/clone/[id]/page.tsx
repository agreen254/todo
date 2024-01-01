"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import TodoNotFound from "@/components/TodoNotFound";

const CloneTodo = ({ params: { id } }: { params: { id: string } }) => {
  const {
    state: { all },
  } = useContext(TodoContext);

  const t = all.find((ele) => ele.id === id);

  if (!t) {
    <TodoNotFound />;
  }
};

export default CloneTodo;
