"use client";

import { useContext, useState } from "react";
import TodoContext from "@/contexts/TodoContext";
import Link from "next/link";
import TodoNotFound from "@/components/Errors/TodoNotFound";
import { Separator } from "@/components/ui/separator";
import { searchByMap } from "@/utils/maps";
import processTodos from "@/utils/processTodos";
import searchTodos from "@/utils/searchTodos";
import sortTodos from "@/utils/sortTodos";
import { useSearchParams } from "next/navigation";
import TodoCard from "@/components/TodoCard/TodoCard";
import { TodoSortOrder } from "@/utils/types";
import SortMenu from "@/components/Sort/SortMenu";
import FilterByTags from "@/components/Sort/FilterByTags";
import filterByTags from "@/utils/filterByTags";
import ThemeToggle from "@/components/ThemeToggle";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const typeParam = searchParams.get("type") || "";

  const {
    state: { todos },
  } = useContext(TodoContext);
  const [localSortOrder, setLocalSortOrder] =
    useState<TodoSortOrder>("default");
  const [localFilterTags, setLocalFilterTags] = useState<string[]>([]);

  if (!typeParam) return <TodoNotFound />;

  const valid = searchTodos(queryParam, typeParam, todos);
  const validSorted = sortTodos(valid, localSortOrder);
  const validFiltered = filterByTags(validSorted, localFilterTags);
  const { pinnedTodos, pendingTodos, completedTodos } = processTodos(
    validFiltered,
    localSortOrder,
    localFilterTags
  );
  const allTodos = [...pinnedTodos, ...pendingTodos, ...completedTodos];

  if (valid.length === 0) return <h1>No Todos Found.</h1>;
  return (
    <>
      <h1 className="text-3xl font-medium mt-4 ml-4">
        Search results for{" "}
        <span className="font-bold">
          {searchByMap.get(typeParam) || typeParam}
        </span>{" "}
        containing<span className="font-bold"> "{queryParam}"</span>
      </h1>
      <Separator className="w-[65vw] h-1 my-2 rounded-r-md bg-primary/50 dark:bg-primary" />
      <div className="flex justify-start gap-4 ml-4 mb-4">
        <SortMenu sortOrder={localSortOrder} />
        <FilterByTags
          filterTags={localFilterTags}
          setFilterTags={setLocalFilterTags}
        />
        <ThemeToggle />
      </div>
      {allTodos.map((t) => (
        <TodoCard
          key={t.id}
          t={t}
          className="min-w-[80vw] md:min-w-[40vw] lg:min-w-[30vw] lg:max-w-[40vw] xl:w-[auto] xl:max-w-[30vw] mx-4 my-4"
        />
      ))}
      <div className="flex justify-center">
        <Link
          href="/"
          className="px-3 py-5 bg-slate-500 w-[150px] text-center inline-block rounded-md hover:shadow-md hover:dark:shadow-slate-200"
        >
          Back Home
        </Link>
      </div>
    </>
  );
};

export default SearchPage;
