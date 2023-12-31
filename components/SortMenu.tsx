"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";
import { sortingMap } from "@/utils/maps";
import { TodoSortOrder, todoSortForMapping } from "@/utils/types";
import { Button } from "./ui/button";

const SortMenu = () => {
  const {
    todoState: { sortOrder },
    dispatch,
  } = useContext(TodoContext);
  const handleSortOrder = (newOrder: TodoSortOrder) => {
    dispatch({ actionName: "SET_SORT_ORDER", newOrder: newOrder });
  };

  const isSelectedSort = (category: TodoSortOrder) => {
    return sortOrder === category;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>sort</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px]">
        <span className="text-sm text-muted-foreground">
          current sort order: {sortingMap.get(sortOrder)}
        </span>
        <Separator className="w-full my-2" />
        {todoSortForMapping.map((entry, idx) => {
          if (entry.length === 1) {
            const displayName = sortingMap.get(entry[0]);
            return (
              <div key={`sortMap${idx}`} className="my-2">
                <span>
                  <Button
                    className="transition-colors"
                    variant={
                      isSelectedSort(entry[0])
                        ? "selectedSort"
                        : "default"
                    }
                    onClick={() => handleSortOrder(entry[0])}
                  >
                    {displayName}
                  </Button>
                </span>
                <Separator className="w-full mt-4" />
              </div>
            );
          } else {
            const [firstDisplay, lastDisplay] = [
              sortingMap.get(entry[0]),
              sortingMap.get(entry[1]),
            ];
            return (
              <div key={`sortMap${idx}`} className="my-2">
                <span>
                  <Button
                    className="mr-4 transition-colors"
                    variant={
                      isSelectedSort(entry[0])
                        ? "selectedSort"
                        : "default"
                    }
                    onClick={() => handleSortOrder(entry[0])}
                  >
                    {firstDisplay}
                  </Button>
                  <Button
                    className="transition-colors"
                    variant={
                      isSelectedSort(entry[1])
                        ? "selectedSort"
                        : "default"
                    }
                    onClick={() => handleSortOrder(entry[1])}
                  >
                    {lastDisplay}
                  </Button>
                </span>
                <Separator className="w-full mt-4" />
              </div>
            );
          }
        })}
      </PopoverContent>
    </Popover>
  );
};

export default SortMenu;
