"use client";

import { useContext, useState } from "react";
import TodoContext from "@/contexts/TodoContext";
import { ChevronDown, ChevronUp, XCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import SortMenuEntries from "./SortMenuEntries";
import { sortingMap } from "@/utils/maps";

const SortMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { sortOrder },
  } = useContext(TodoContext);

  const handleChevron = () => {
    return isOpen ? (
      <ChevronUp className="w-4 h-4 ml-2" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-2" />
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button>sort {handleChevron()}</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[400px] w-[95vw] hover:ring-2 hover:ring-ring">
        <SortMenuEntries />
        <p className="text-sm text-muted-foreground">
          current sort order: {sortingMap.get(sortOrder)}
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default SortMenu;
