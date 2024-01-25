"use client";

import { useContext, useEffect, useState } from "react";
import TodoContext from "@/contexts/TodoContext";
import { Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InvalidSearch from "@/components/Errors/InvalidSearch";
import { searchByMap } from "@/utils/maps";
import processTodos from "@/utils/processTodos";
import searchTodos from "@/utils/searchTodos";
import sortTodos from "@/utils/sortTodos";
import { useSearchParams } from "next/navigation";
import GradSeparator from "@/components/GradSeparator";
import TodoCard from "@/components/TodoCard/TodoCard";
import { FilterTagsSchema, TodoSortOrder } from "@/utils/types";
import SortMenu from "@/components/Sort/SortMenu";
import FilterByTags from "@/components/Sort/FilterByTags";

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
  const [localFilterSchema, setLocalFilterSchema] =
    useState<FilterTagsSchema>("exclusive");

  // will throw hydration error on refresh without checking mount
  // can also separate below logic to a dynamic import component
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  if (!["name", "description", "dueAt"].includes(typeParam))
    return <InvalidSearch />;

  const valid = searchTodos(queryParam, typeParam, todos);
  const validSorted = sortTodos(valid, localSortOrder);
  const { pinnedTodos, pendingTodos, completedTodos } = processTodos(
    validSorted,
    localSortOrder,
    localFilterTags,
    localFilterSchema
  );
  const allTodos = [...pinnedTodos, ...pendingTodos, ...completedTodos];

  return (
    <>
      <div className="flex justify-start items-center">
        <h1 className="text-3xl font-medium mt-4 ml-4">
          Search results for{" "}
          <span className="font-bold">
            {searchByMap.get(typeParam) || typeParam}
          </span>{" "}
          containing<span className="font-bold"> "{queryParam}"</span>
        </h1>
      </div>
      <GradSeparator />
      <div className="flex justify-start gap-4 ml-4 mb-4">
        <SortMenu sortOrder={localSortOrder} setSortOrder={setLocalSortOrder} />
        <FilterByTags
          filterTags={localFilterTags}
          setFilterTags={setLocalFilterTags}
          setFilterTagsSchema={setLocalFilterSchema}
        />
        <div>
          <Button
            className="hover:scale-110 transition-all"
            size="icon"
            role="link"
          >
            <Link href="/">
              <HomeIcon className="w-[20px] h-[20px]" />
            </Link>
          </Button>
        </div>
      </div>
      {valid.length === 0 && <h1 className="text-2xl ml-6">No todos found.</h1>}
      <div className="flex flex-wrap">
        {allTodos.map((t) => (
          <TodoCard
            key={t.id}
            t={t}
            className="min-w-[80vw] md:min-w-[40vw] lg:min-w-[30vw] lg:max-w-[40vw] xl:w-[auto] xl:max-w-[30vw] mx-4 my-4"
          />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
