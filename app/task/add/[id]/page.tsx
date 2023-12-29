"use client";
import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";

const AddTodoPage = ({ params: { id } }: { params: { id: string } }) => {
  return <h1>{id}</h1>;
};

export default AddTodoPage;