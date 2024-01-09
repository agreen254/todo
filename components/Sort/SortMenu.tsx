"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import SortMenuEntries from "./SortMenuEntries";
import { sortingMap } from "@/utils/maps";
import { TodoSortOrder } from "@/utils/types";

type Props = {
  sortOrder: TodoSortOrder;
  setSortOrder?: (newOrder: TodoSortOrder) => void;
};

const SortMenu = ({ sortOrder, setSortOrder }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <Button className="transition-all hover:scale-[1.05]">sort {handleChevron()}</Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="max-w-[400px] w-[95vw] hover:border-primary transition-colors">
        <SortMenuEntries sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <p className="text-sm text-muted-foreground">
          current sort order: {sortingMap.get(sortOrder)}
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default SortMenu;
