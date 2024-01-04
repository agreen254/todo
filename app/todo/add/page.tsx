"use client";

import { redirect } from "next/navigation";
import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import type { Metadata } from "next";

export const metaData: Metadata = {
  title: "Add a Todo",
};

const AddTodoPage = () => {
  return <h1>Add Todo Page</h1>;
};

export default AddTodoPage;
