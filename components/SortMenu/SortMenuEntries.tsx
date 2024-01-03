"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import { Separator } from "../ui/separator";
import { sortingMap } from "@/utils/maps";
import { TodoSortOrder, todoSortForMapping } from "@/utils/types";
import { Button } from "../ui/button";

const SortMenuEntries = () => {
  const {
    state: { sortOrder },
    dispatch,
  } = useContext(TodoContext);
  const isSelectedSort = (category: TodoSortOrder) => {
    return sortOrder === category;
  };

  return todoSortForMapping.map((entry, idx) => {
    if (entry.length === 1) {
      return;
    } else {
      const [firstDisplay, lastDisplay] = [
        sortingMap.get(entry[0]),
        sortingMap.get(entry[1]),
      ];
      return (
        <div key={`sortMap${idx}`} className="my-2">
          <span className="flex justify-between">
            <Button
              className="mr-4 transition-colors w-[calc(50%-12px)] font-semibold"
              variant={isSelectedSort(entry[0]) ? "selectedSort" : "default"}
              onClick={() =>
                dispatch({ cmd: "SET_SORT_ORDER", newOrder: entry[0] })
              }
            >
              {firstDisplay}
            </Button>
            <Button
              className="transition-colors w-[calc(50%-12px)] font-semibold"
              variant={isSelectedSort(entry[1]) ? "selectedSort" : "default"}
              onClick={() =>
                dispatch({ cmd: "SET_SORT_ORDER", newOrder: entry[1] })
              }
            >
              {lastDisplay}
            </Button>
          </span>
          <Separator className="w-full mt-4" />
        </div>
      );
    }
  });
};

export default SortMenuEntries;
