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
import SortMenu from "./SortMenu";
import { randColor } from "@/utils/helpers";

const Body = () => {
  const {
    state: { completed, pending, pinned },
    dispatch,
  } = useContext(TodoContext);

  const dummyTodo: Todo = {
    name: "this is a test to see how a really long title will look when it wraps around",
    description: "a short description of the task",
    createdAt: DateTime.now(),
    dueAt: DateTime.now().plus({ days: 7 }),
    priority: 3,
    complexity: 5,
    isCompleted: false,
    isPinned: false,
    id: uid(),
    tags: [
      {
        name: "home",
        color: randColor(),
      },
    ],
  };

  return (
    <>
      <Button
        onClick={() => dispatch({ command: "ADD_TODO", toAdd: dummyTodo })}
      >
        Add Dummy
      </Button>
      <SortMenu />
      <h2 className="text-3xl ml-10">
        {pending.length || pinned.length
          ? "Pending Todos:"
          : "No pending todos to show."}
      </h2>
      <Separator className="w-[65vw] my-2 h-[3px] rounded-tr-md rounded-br-md" />
      <div className="flex justify-start flex-wrap max-w-[3340px] mx-auto">
        <TodoMapper todos={pinned} />
        <TodoMapper todos={pending} />
      </div>
      <h2 className="ml-10 mt-12 text-3xl">
        {completed.length ? "Completed Todos:" : "No completed todos to show."}
      </h2>
      <Separator className="w-[65vw] my-2 h-[3px] rounded-tr-md rounded-br-md" />
      <div className="flex justify-start flex-wrap max-w-[3340px] mx-auto">
        <TodoMapper todos={completed} />
      </div>
      <RemoveAllAlert />
    </>
  );
};

export default Body;
