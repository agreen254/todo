"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import SortMenuEntries from "./SortMenuEntries";
import MenuChevron from "../MenuChevron";
import { sortingMap } from "@/utils/maps";
import { TodoSortOrder } from "@/utils/types";

type Props = {
  sortOrder: TodoSortOrder;
  setSortOrder?: (newOrder: TodoSortOrder) => void;
  role?: "pending" | "completed";
};

const SortMenu = ({ sortOrder, setSortOrder, role }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="transition-all hover:scale-[1.05]">
          <MenuChevron name="sort" isOpen={isOpen} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="max-w-[400px] w-[95vw] hover:border-primary transition-colors"
      >
        <SortMenuEntries sortOrder={sortOrder} setSortOrder={setSortOrder} role={role} />
        <p className="text-sm text-muted-foreground">
          current sort order: {sortingMap.get(sortOrder)}
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default SortMenu;
