"use client";

import { useContext } from "react";
import { faker as f } from "@faker-js/faker";
import { DateTime } from "luxon";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Todo } from "@/utils/types";
import { uid } from "uid";
import RemoveAllAlert from "./Dialogs/RemoveAllDialog";
import TodoContext from "@/contexts/TodoContext";
import TodoMapper from "./TodoMapper";
import SortMenu from "./SortMenu/SortMenu";

const Body = () => {
  const {
    state: { completed, pending, pinned },
    dispatch,
  } = useContext(TodoContext);

  const dummyTodo: Todo = {
    name: f.lorem.words({ min: 1, max: 8 }),
    description: f.lorem.words({ min: 3, max: 14 }),
    createdAt: DateTime.now().toISO(),
    dueAt: f.date
      .between({
        from: DateTime.now().toISO(),
        to: DateTime.now().plus({ days: 30 }).toISO(),
      })
      .toISOString(),
    priority: f.number.int({ min: 1, max: 10 }),
    complexity: f.number.int({ min: 1, max: 10 }),
    isCompleted: false,
    isPinned: false,
    id: uid(),
    repeatId: uid(),
    tags: ["home", "chores"],
  };

  return (
    <>
      <Button onClick={() => dispatch({ cmd: "ADD_TODO", toAdd: dummyTodo })}>
        Add Dummy
      </Button>
      <SortMenu />
      {(!!pending.length || !!pinned.length) && (
        <div>
          <h2 className="text-3xl ml-10 text-primary">Pending:</h2>
          <Separator className="bg-primary w-[65vw] my-2 h-[3px] rounded-l-none rounded-tr-md rounded-br-md" />
        </div>
      )}
      <div className="flex justify-start flex-wrap max-w-[3340px] mx-auto">
        <TodoMapper todos={pinned} />
        <TodoMapper todos={pending} />
      </div>
      {!!completed.length && (
        <div className="mt-8">
          <h2 className="text-3xl ml-10 text-primary">Completed:</h2>
          <Separator className="bg-primary w-[65vw] my-2 h-[3px] rounded-l-none rounded-tr-md rounded-br-md" />
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
