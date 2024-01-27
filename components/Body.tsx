"use client";

import { useContext, useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import dummyTodo from "@/utils/todos/dummyTodo";
import FilterByTags from "./Sort/FilterByTags";
import GradSeparator from "./GradSeparator";
import RemoveAllAlert from "./Dialogs/RemoveAllDialog";
import TodoContext from "@/contexts/TodoContext";
import TodoMapper from "./TodoMapper";
import SortMenu from "./Sort/SortMenu";
import SearchForm from "./Forms/SearchForm";
import ThemeToggle from "./ThemeToggle";
import processTodos from "@/utils/todos/processTodos";
import PowerModeDialog from "./Dialogs/PowerModeDialog";

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
  const hasNoEntries = () => !!!state.todos.length;

  return (
    <>
      <div className="justify-center items-start grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="gap-x-2 md:gap-x-6 flex justify-center items-center mt-4 md:mt-10">
          <Link href="/todo/add">
            <Button
              role="link"
              className={cn(
                "w-[min(40vw,180px)] px-5 py-8 text-lg font-medium dark:font-semibold rounded-full hover:shadow-md hover:scale-[1.05] hover:translate-y-[-4px] hover:dark:shadow-slate-800 transition-all",
                hasNoEntries() &&
                  "bg-gradient-to-r from-primary dark:to-cyan-300 to-cyan-500"
              )}
            >
              <Plus className="w-6 h-6 mr-2" />
              Add Todo
            </Button>
          </Link>
          <PowerModeDialog />
        </div>
        <div className="flex justify-center items-start mt-2 md:mt-10">
          <div className="hidden md:flex items-center space-x-4 mt-2 mr-[12px]">
            <ThemeToggle />
          </div>
          <div className="w-[min(350px,90vw)]">
            <SearchForm />
            <div className="gap-x-4 mt-2 flex items-start">
              <div className="inline md:hidden">
                <ThemeToggle />
              </div>
              <SortMenu sortOrder={state.sortOrder} />
              <FilterByTags
                filterTags={filterTags}
                setFilterTags={setFilterTags}
                setFilterTagsSchema={setFilterTagsSchema}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
      {hasPendingOrPinned() && (
        <div className="mt-8 lg:mt-2">
          <h2 className="text-xl lg:text-3xl ml-10 text-primary uppercase font-extrabold">
            Pending
          </h2>
          <GradSeparator />
        </div>
      )}
      <div className="flex justify-start flex-wrap max-w-[3340px] mx-auto">
        <TodoMapper todos={pinnedTodos} />
        <TodoMapper todos={pendingTodos} />
      </div>
      {hasNoCompleted() && (
        <div className="mt-16">
          <h2 className="text-3xl ml-10 text-primary uppercase font-extrabold">
            Completed
          </h2>
          <GradSeparator />
        </div>
      )}
      <div className="flex justify-start flex-wrap max--[3340px] mx-auto">
        <TodoMapper todos={completedTodos} />
      </div>
      <div className="flex justify-center gap-4 my-4">
        <RemoveAllAlert />
        <Button
          onClick={() => dispatch({ cmd: "ADD_TODO", toAdd: dummyTodo() })}
        >
          Add Dummy
        </Button>
      </div>
    </>
  );
};

export default Body;
