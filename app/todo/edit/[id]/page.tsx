"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import TodoNotFound from "@/components/Errors/TodoNotFound";

// dynamic import lets us adjust the document title once the todo name is loaded
// without getting a hydration error
import dynamic from "next/dynamic";
const DynamicEditForm = dynamic(() => import("@/components/Forms/EditForm"), {
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

  if (!t) {
    <TodoNotFound />;
  }
  return <DynamicEditForm id={id} />;
};

export default EditTodo;
