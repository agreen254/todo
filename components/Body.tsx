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
      <div className="flex flex-col lg:flex-row justify-center items-start mt-2">
        <div className="flex w-full lg:w-auto gap-x-4 mt-2 mr-8 justify-center">
          <Link href="/todo/add">
            <Button
              role="link"
              className={cn(
                "w-[min(45vw,180px)] px-2 lg:px-5 py-6 text-lg rounded-xl font-medium dark:font-semibold hover:shadow-md hover:dark:shadow-slate-800",
                hasNoEntries() &&
                  "bg-gradient-to-r from-primary dark:to-cyan-300 to-cyan-500"
              )}
            >
              <Plus className="w-6 h-6 mr-2" />
              Add To-Do
            </Button>
          </Link>
          <div className="lg:hidden">
            <PowerModeDialog />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4 mt-2 mr-[12px]">
          <ThemeToggle />
        </div>
        <div className="w-[min(350px,90vw)]">
          <SearchForm />
          <div className="gap-x-4 mt-2 flex items-start">
            <div className="inline md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div className="ml-8 mt-2">
          <PowerModeDialog />
        </div>
      </div>
      {hasPendingOrPinned() && (
        <div className="mt-8 lg:mt-2">
          <h2 className="text-2xl lg:text-3xl ml-10 text-primary uppercase font-semibold dark:font-bold">
            Pending
          </h2>
          <GradSeparator />
          <div className="space-x-4 ml-8 mt-4">
            <SortMenu sortOrder={state.sortOrder.pending} />
            <FilterByTags
              filterTags={filterTags}
              setFilterTags={setFilterTags}
              setFilterTagsSchema={setFilterTagsSchema}
            />
          </div>
        </div>
      )}
      <div className="flex justify-start flex-wrap max-w-[3340px] mx-auto">
        <TodoMapper todos={pinnedTodos} />
        <TodoMapper todos={pendingTodos} />
      </div>
      {hasNoCompleted() && (
        <div className="mt-16">
          <h2 className="text-3xl ml-10 text-primary uppercase font-semibold dark:font-bold">
            Completed
          </h2>
          <GradSeparator />
          <div className="space-x-4 ml-8 mt-4">
            <SortMenu sortOrder={state.sortOrder.completed} />
            <FilterByTags
              filterTags={filterTags}
              setFilterTags={setFilterTags}
              setFilterTagsSchema={setFilterTagsSchema}
            />
          </div>
        </div>
      )}
      <div className="flex justify-start flex-wrap max-w-[3340px] mx-auto">
        <TodoMapper todos={completedTodos} />
      </div>
      <div className={cn("fixed bottom-4 right-4")}>
        <RemoveAllAlert />
        <Button
          className="ml-4"
          onClick={() => dispatch({ cmd: "ADD_TODO", toAdd: dummyTodo() })}
        >
          Add Dummy
        </Button>
      </div>
    </>
  );
};

export default Body;
