"use client";

import { useContext } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import dummyTodo from "@/utils/dummyTodo";
import RemoveAllAlert from "./Dialogs/RemoveAllDialog";
import TodoContext from "@/contexts/TodoContext";
import TodoMapper from "./TodoMapper";
import SortMenu from "./SortMenu/SortMenu";

const Body = () => {
  const {
    state: { completed, pending, pinned },
    dispatch,
  } = useContext(TodoContext);

  return (
    <>
      <Button onClick={() => dispatch({ cmd: "ADD_TODO", toAdd: dummyTodo() })}>
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
