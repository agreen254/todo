"use client";

import { useContext, useEffect } from "react";
import TodoContext from "@/contexts/TodoContext";
import TodoNotFound from "../TodoNotFound";

const EditForm = ({ id }: { id: string }) => {
  const {
    state: { all },
  } = useContext(TodoContext);
  const t = all.find((t) => t.id === id);

  useEffect(() => {
    if (t) {
      document.title = `Edit Todo: ${t.name}`;
    }
  }, []);

  if (!t) {
    return <TodoNotFound />;
  }

  return (
    <div>
      <p>{t.name}</p>
      <p>{t.dueAt?.toString()}</p>
    </div>
  );
};

export default EditForm;
