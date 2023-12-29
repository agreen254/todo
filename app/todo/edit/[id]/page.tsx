"use client";
import { redirect } from "next/navigation";
import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const AddTodoPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    todos: { all },
  } = useContext(TodoContext);
  const toEdit = all.find((t) => t.id === id);

  if (!toEdit) {
    return (
      <div>
        <h1>The requested todo could not be found.</h1>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p>{toEdit.name}</p>
      <p>{toEdit.dueAt.toString()}</p>
    </div>
  );
};

export default AddTodoPage;
