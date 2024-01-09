"use client";

import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Plus, Power } from "lucide-react";
import Link from "next/link";
import dummyTodo from "@/utils/dummyTodo";
import FilterByTags from "./Sort/FilterByTags";
import RemoveAllAlert from "./Dialogs/RemoveAllDialog";
import TodoContext from "@/contexts/TodoContext";
import TodoMapper from "./TodoMapper";
import SortMenu from "./Sort/SortMenu";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import processTodos from "@/utils/processTodos";
import { add } from "date-fns";

const Body = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterTagsSchema, setFilterTagsSchema] = useState<
    "exclusive" | "inclusive"
  >("exclusive");

  const { pinnedTodos, pendingTodos, completedTodos } = processTodos(
    state.todos,
    state.sortOrder,
    filterTags,
    filterTagsSchema
  );

  const hasPendingOrPinned = () =>
    !!pendingTodos.length || !!pinnedTodos.length;
  const hasNoCompleted = () => !!completedTodos.length;
  const hasEntries = () => !!state.todos.length;

  // if (hasNoEntries()) {
  //   return (
  //     <h2 className="text-3xl font-bold text-center">
  //       add a todo to get started
  //     </h2>
  //   );
  // }

  return (
    <>
      <Button
        onClick={() => {
          const date = new Date(2023, 0, 30);
          console.log(date);
          const newDate = add(date, { months: 1 });
          const newDateTwo = add(date, { months: 3 });
          console.log(newDate);
          console.log(newDateTwo);
        }}
      >
        Test
      </Button>
      <div className="flex justify-center gap-4 mt-4">
        <Button
          onClick={() => dispatch({ cmd: "ADD_TODO", toAdd: dummyTodo() })}
        >
          Add Dummy
        </Button>
      </div>
      <div className="flex justify-center gap-12">
        <Link href="/todo/add" className="w-[min(40%,150px)]">
          <Button
            role="link"
            className="w-[180px] px-5 py-8 text-lg font-medium dark:font-semibold rounded-full hover:shadow-md hover:scale-[1.05] transition-all"
          >
            <Plus className="w-6 h-6 mr-2" />
            Add Todo
          </Button>
        </Link>
        <Button className="w-[180px] px-5 py-8 text-lg font-medium dark:font-semibold rounded-full hover:shadow-md hover:scale-[1.05] transition-all">
          <Power className="w-6 h-6 mr-2" />
          Power Mode
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <ThemeToggle />
          <SearchBar />
        </div>
        <div className="w-[min(350px,90vw)] mt-4 space-x-4">
          <SortMenu sortOrder={state.sortOrder} />
          <FilterByTags filterTags={filterTags} setFilterTags={setFilterTags} setFilterTagsSchema={setFilterTagsSchema}/>
        </div>
      </div>
      {hasPendingOrPinned() && (
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
