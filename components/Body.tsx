"use client";

import { useContext } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import dummyTodo from "@/utils/dummyTodo";
import RemoveAllAlert from "./Dialogs/RemoveAllDialog";
import TodoContext from "@/contexts/TodoContext";
import TodoMapper from "./TodoMapper";
import SortMenu from "./SortMenu/SortMenu";
import SearchBar from "./SearchBar";

const Body = () => {
  const {
    state: { all, completed, pending, pinned },
    dispatch,
  } = useContext(TodoContext);

  const hasNoPendingOrPinned = () => !!pending.length && !!pinned.length;
  const hasNoCompleted = () => !!completed.length;
  const hasNoEntries = () => all.length === 0;

  // if (hasNoEntries()) {
  //   return (
  //     <h2 className="text-3xl font-bold text-center">
  //       add a todo to get started
  //     </h2>
  //   );
  // }

  return (
    <>
      <div>
        <Button
          onClick={() => dispatch({ cmd: "ADD_TODO", toAdd: dummyTodo() })}
        >
          Add Dummy
        </Button>
        <SortMenu />
      </div>
      <div className="flex justify-center">
        <SearchBar />
      </div>
      {hasNoPendingOrPinned() && (
        <div>
          <h2 className="text-3xl ml-10 text-primary">Pending:</h2>
          <Separator className="bg-primary w-[65vw] my-2 h-[3px] rounded-l-none rounded-tr-md rounded-br-md" />
        </div>
      )}
      <div className="flex justify-start flex-wrap max-w-[3340px] mx-auto">
        <TodoMapper todos={pinned} />
        <TodoMapper todos={pending} />
      </div>
      {hasNoCompleted() && (
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
