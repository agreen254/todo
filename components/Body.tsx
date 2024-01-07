"use client";

import { useContext } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import dummyTodo from "@/utils/dummyTodo";
import FilterByTags from "./Sort/FilterByTags";
import RemoveAllAlert from "./Dialogs/RemoveAllDialog";
import TodoContext from "@/contexts/TodoContext";
import TodoMapper from "./TodoMapper";
import SortMenu from "./Sort/SortMenu";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const Body = () => {
  const {
    state: {
      todos: { allTodos, completedTodos, pendingTodos, pinnedTodos },
    },
    dispatch,
  } = useContext(TodoContext);

  const hasNoPendingOrPinned = () =>
    !!pendingTodos.length && !!pinnedTodos.length;
  const hasNoCompleted = () => !!completedTodos.length;
  const hasNoEntries = () => allTodos.length === 0;

  // if (hasNoEntries()) {
  //   return (
  //     <h2 className="text-3xl font-bold text-center">
  //       add a todo to get started
  //     </h2>
  //   );
  // }

  return (
    <>
      <div className="flex justify-center gap-4 mt-4">
        <Button
          onClick={() => dispatch({ cmd: "ADD_TODO", toAdd: dummyTodo() })}
        >
          Add Dummy
        </Button>
        <SortMenu />
        <FilterByTags />
        <ThemeToggle />
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
        <TodoMapper todos={pinnedTodos} />
        <TodoMapper todos={pendingTodos} />
      </div>
      {hasNoCompleted() && (
        <div className="mt-8">
          <h2 className="text-3xl ml-10 text-primary">Completed:</h2>
          <Separator className="bg-primary w-[65vw] my-2 h-[3px] rounded-l-none rounded-tr-md rounded-br-md" />
        </div>
      )}
      <div className="flex justify-start flex-wrap max--[3340px] mx-auto">
        <TodoMapper todos={completedTodos} />
      </div>
      <RemoveAllAlert />
    </>
  );
};

export default Body;
