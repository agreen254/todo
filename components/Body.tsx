"use client";

import { useContext } from "react";
import { DateTime } from "luxon";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Todo } from "@/utils/todoTypes";
import { v4 as uuid } from "uuid";
import CompletedTodos from "./CompletedTodos";
import PinnedTodos from "./PinnedTodos";
import PendingTodos from "./PendingTodos";
import RemoveAllDialog from "./RemoveAllDialog";
import TodoContext from "@/contexts/TodoContext";

const Body = () => {
  const {
    todoState: { completed, pending, pinned },
    dispatch,
  } = useContext(TodoContext);

  const dummyTodo: Todo = {
    name: "this is a test to see how a really long title will look when it wraps around",
    description: "a short description of the task",
    createdAt: DateTime.now(),
    dueAt: DateTime.now().plus({ days: 7 }),
    isCompleted: false,
    isPinned: false,
    id: uuid(),
    tags: ["home", "chores"],
  };

  return (
    <>
      <Button
        onClick={() => dispatch({ actionName: "ADD_TODO", toAdd: dummyTodo })}
      >
        Add Dummy
      </Button>
      <h2 className="text-3xl ml-10">
        {pending.length || pinned.length
          ? "Pending Todos:"
          : "No pending todos to show."}
      </h2>
      <Separator className="w-[65vw] my-2 h-[3px] rounded-tr-md rounded-br-md" />
      <div className="flex justify-start flex-wrap max-w-[1920px] mx-auto">
        <PinnedTodos />
        <PendingTodos />
      </div>
      <h2 className="ml-10 mt-12 text-3xl">
        {completed.length ? "Completed Todos:" : "No completed todos to show."}
      </h2>
      <Separator className="w-[65vw] my-2 h-[3px] rounded-tr-md rounded-br-md" />
      <div className="flex justify-start flex-wrap max-w-[1920px] mx-auto">
        <CompletedTodos />
      </div>
      <RemoveAllDialog />
    </>
  );
};

export default Body;