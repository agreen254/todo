"use client";
import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import TodoNotFound from "@/components/TodoNotFound";

const AddTodoPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    todoState: { all },
  } = useContext(TodoContext);
  const t = all.find((t) => t.id === id);

  if (!t) {
    return <TodoNotFound />;
  }

  return (
    <div>
      <p>{t.name}</p>
      <p>{t.dueAt.toString()}</p>
    </div>
  );
};

export default AddTodoPage;
