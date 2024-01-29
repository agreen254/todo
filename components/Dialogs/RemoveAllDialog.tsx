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
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";

const RemoveAllDialog = () => {
  const {
    state: {
      todos,
    },
    dispatch,
  } = useContext(TodoContext);
  const handleDeleteAll = () => {
    dispatch({ cmd: "DELETE_ALL_TODOS" });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={!todos.length}
          variant="destructive"
          className="focus-visible:ring-destructive"
        >
          Delete All
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] max-w-[480px]">
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
