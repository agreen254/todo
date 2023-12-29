"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Todo } from "../todoTypes";
import { useContext } from "react";
import TodoContext from "../context/TodoContext";

const RemoveAllDialog = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const handleDeleteAll = () => {
    dispatch({ actionName: "DELETE_ALL_TODOS" });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={!todos.length} className="hover:bg-red-500">
          Delete All
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove All Todos</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove all of your todos?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDeleteAll}
              className="hover:bg-red-500"
            >
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveAllDialog;
