"use client";

import { useContext, useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import dummyTodo from "@/utils/todos/dummyTodo";
import FilterByTags from "./Sort/FilterByTags";
import GradientSeparator from "./GradientSeparator";
import RemoveAllAlert from "./Dialogs/RemoveAllDialog";
import TodoContext from "@/contexts/TodoContext";
import TodoMapper from "./TodoMapper";
import SortMenu from "./Sort/SortMenu";
import SearchForm from "./Forms/SearchForm";
import ThemeToggle from "./ThemeToggle";
import processTodos from "@/utils/todos/processTodos";
import PowerModeDialog from "./Dialogs/PowerModeDialog";
import splitTodos from "@/utils/todos/splitTodos";

const Body = () => {
  const { state, dispatch } = useContext(TodoContext);

  const [addIsHovered, setAddIsHovered] = useState(false);

  const [filterTagsPending, setFilterTagsPending] = useState<string[]>([]);
  const [filterTagsCompleted, setFilterTagsCompleted] = useState<string[]>([]);
  const [filterTagsSchema, setFilterTagsSchema] = useState<
    "exclusive" | "inclusive"
  >("exclusive");

  const {
    pinnedTodos: storedPinned,
    pendingTodos: storedPending,
    completedTodos: storedCompleted,
  } = splitTodos(state.todos);
  const { pinnedTodos, pendingTodos, completedTodos } = processTodos(
    state.todos,
    state.sortOrder,
    { pending: filterTagsPending, completed: filterTagsCompleted },
    filterTagsSchema
  );

  const hasPendingOrPinned = () =>
    !!storedPending.length || !!storedPinned.length;
  const hasNoCompleted = () => !!storedCompleted.length;

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start mt-2">
        <div className="flex w-full lg:w-auto gap-x-4 mt-2 mr-8 justify-center">
          <Link href="/todo/add" tabIndex={-1}>
            <Button
              role="link"
              onMouseEnter={() => setAddIsHovered(true)}
              onMouseLeave={() => setAddIsHovered(false)}
              className="w-[min(45vw,180px)] px-2 lg:px-5 py-6 text-lg rounded-xl font-medium dark:font-semibold hover:shadow-md hover:dark:shadow-slate-800"
            >
              <Plus
                className={cn("w-6 h-6 mr-2", addIsHovered && "text-teal-500")}
              />
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
          <GradientSeparator />
          <div className="space-x-4 ml-8 mt-4">
            <SortMenu sortOrder={state.sortOrder.pending} role="pending" />
            <FilterByTags
              filterTags={filterTagsPending}
              setFilterTags={setFilterTagsPending}
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
        <div className={cn("mt-16", !hasPendingOrPinned() && "mt-2")}>
          <h2 className="text-3xl ml-10 text-primary uppercase font-semibold dark:font-bold">
            Completed
          </h2>
          <GradientSeparator />
          <div className="space-x-4 ml-8 mt-4">
            <SortMenu sortOrder={state.sortOrder.completed} role="completed" />
            <FilterByTags
              filterTags={filterTagsCompleted}
              setFilterTags={setFilterTagsCompleted}
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
