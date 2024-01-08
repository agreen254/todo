"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import { Separator } from "../ui/separator";
import { sortingMap } from "@/utils/maps";
import { TodoSortOrder, todoSortValues } from "@/utils/types";
import { Button } from "../ui/button";

type Props = {
  sortOrder: TodoSortOrder;
  setSortOrder?: (newOrder: TodoSortOrder) => void;
};

const SortMenuEntries = ({ sortOrder, setSortOrder }: Props) => {
  const { dispatch } = useContext(TodoContext);
  const handleSelectSort = (selectedOrder: TodoSortOrder) => {
    if (setSortOrder) {
      selectedOrder === sortOrder
        ? setSortOrder("default")
        : setSortOrder(selectedOrder);
    } else {
      selectedOrder === sortOrder
        ? dispatch({ cmd: "SET_SORT_ORDER", newOrder: "default" })
        : dispatch({ cmd: "SET_SORT_ORDER", newOrder: selectedOrder });
    }
  };

  const isSelectedSort = (category: TodoSortOrder) => {
    return sortOrder === category;
  };

  return todoSortValues.map((entry, idx) => {
    if (entry.length === 1) {
      return; // skip rendering "default" by itself
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
              onClick={() => handleSelectSort(entry[0])}
            >
              {firstDisplay}
            </Button>
            <Button
              className="transition-colors w-[calc(50%-12px)] font-semibold"
              variant={isSelectedSort(entry[1]) ? "selectedSort" : "default"}
              onClick={() => handleSelectSort(entry[1])}
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
