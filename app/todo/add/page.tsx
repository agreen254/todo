"use client";
import { redirect } from "next/navigation";
import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";

const AddTodoPage = ({ params: { id } }: { params: { id: string } }) => {
  return <h1>Add Todo Page</h1>;
};

export default AddTodoPage;
