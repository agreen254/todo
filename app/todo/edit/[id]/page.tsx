"use client";
import { redirect } from "next/navigation";
import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

const AddTodoPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    todoState: { all },
  } = useContext(TodoContext);
  const toEdit = all.find((t) => t.id === id);

  if (!toEdit) {
    return (
      <div className="flex flex-col justify-center items-center mt-[10vh]">
        <h1 className="text-4xl font-bold mb-6">
          The requested todo could not be found.
        </h1>
        <Link href="/">
          <Button className="text-2xl font-extrabold px-6 py-8">Return Home</Button>
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
