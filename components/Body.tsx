"use client";

import { useContext } from "react";
import { DateTime } from "luxon";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Todo } from "@/utils/types";
import { uid } from "uid";
import RemoveAllAlert from "./RemoveAllAlert";
import TodoContext from "@/contexts/TodoContext";
import TodoMapper from "./TodoMapper";
import SortMenu from "./SortMenu/SortMenu";

const Body = () => {
  const {
    state: { completed, pending, pinned },
    dispatch,
  } = useContext(TodoContext);

  const dummyTodo: Todo = {
    name: "this is a test to see how a really long title will look when it wraps around",
    description: "a short description of the task",
    createdAt: DateTime.now().toISO(),
    dueAt: DateTime.now().plus({ days: 7 }).toISO(),
    priority: 3,
    complexity: 5,
    isCompleted: false,
    isPinned: false,
    id: uid(),
    repeatId: uid(),
    tags: [
      {
        name: "home",
        color: Math.floor(Math.random() * 24),
      },
    ],
  };

  return (
    <>
      <Button
        onClick={() => dispatch({ cmd: "ADD_TODO", toAdd: dummyTodo })}
      >
        Add Dummy
      </Button>
      <SortMenu />
      {(!!pending.length || !!pinned.length) && (
        <div>
          <h2 className="text-3xl ml-10 text-primary">Pending:</h2>
          <Separator className="bg-primary w-[65vw] my-2 h-[3px] rounded-tr-md rounded-br-md" />
        </div>
      )}
      <div className="flex justify-start flex-wrap max-w-[3340px] mx-auto">
        <TodoMapper todos={pinned} />
        <TodoMapper todos={pending} />
      </div>
      {!!completed.length && (
        <div className="mt-8">
          <h2 className="text-3xl ml-10 text-primary">Completed:</h2>
          <Separator className="bg-primary w-[65vw] my-2 h-[3px] rounded-tr-md rounded-br-md" />
        </div>
      )}
      <div className="flex justify-start flex-wrap max-w-[3340px] mx-auto">
        <TodoMapper todos={completed} />
      </div>
      <RemoveAllAlert />
    </>
  );
};

export default Body;
