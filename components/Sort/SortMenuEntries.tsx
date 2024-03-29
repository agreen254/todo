"use client";

import { Separator } from "../ui/separator";
import { sortingMap } from "@/utils/maps";
import { TodoSortOrder, todoSortValues } from "@/utils/types";
import { Button } from "../ui/button";
import { useTodo } from "@/providers/TodoProvider";

type Props = {
  sortOrder: TodoSortOrder;
  setSortOrder?: (newOrder: TodoSortOrder) => void;
  role?: "pending" | "completed";
};

const SortMenuEntries = ({ sortOrder, setSortOrder, role }: Props) => {
  const { dispatch } = useTodo();
  const handleSelectSort = (selectedOrder: TodoSortOrder) => {
    if (setSortOrder) {
      selectedOrder === sortOrder
        ? setSortOrder("default")
        : setSortOrder(selectedOrder);
    } else {
      if (role === "pending") {
        selectedOrder === sortOrder
          ? dispatch({ cmd: "SET_PENDING_SORT_ORDER", newOrder: "default" })
          : dispatch({
              cmd: "SET_PENDING_SORT_ORDER",
              newOrder: selectedOrder,
            });
      } else {
        selectedOrder === sortOrder
          ? dispatch({ cmd: "SET_COMPLETED_SORT_ORDER", newOrder: "default" })
          : dispatch({
              cmd: "SET_COMPLETED_SORT_ORDER",
              newOrder: selectedOrder,
            });
      }
    }
  };

  const isSelectedSort = (category: TodoSortOrder) => {
    return sortOrder === category;
  };

  return todoSortValues.map((entry, idx) => {
    if (entry.length === 1) {
      return; // skip rendering "default" and "powerMode" options
    } else {
      const [firstDisplay, lastDisplay] = [
        sortingMap.get(entry[0]),
        sortingMap.get(entry[1]),
      ];
      return (
        <div key={`sortMap${idx}`} className="my-2">
          <span className="flex justify-between">
            <Button
              className="mr-4 transition-all hover:scale-[1.05] w-[calc(50%-12px)] dark:font-semibold"
              variant={isSelectedSort(entry[0]) ? "selectedSort" : "default"}
              onClick={() => handleSelectSort(entry[0])}
            >
              {firstDisplay}
            </Button>
            <Button
              className="transition-all hover:scale-[1.05] w-[calc(50%-12px)] dark:font-semibold"
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
