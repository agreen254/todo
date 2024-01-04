"use client";

import { useContext, useState } from "react";
import TodoContext from "@/contexts/TodoContext";
import { XCircle } from "lucide-react";
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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button>sort</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[400px] w-[95vw]">
        <span className="text-sm text-muted-foreground">
          current sort order: {sortingMap.get(sortOrder)}
        </span>
        <Separator className="w-full my-2" />
        <SortMenuEntries />
        <div className="w-full flex justify-center">
          <Button
            className="mt-2 w-full font-bold"
            onClick={() => setIsOpen(false)}
          >
            <XCircle className="mr-2 translate-y-[1px]" />
            close menu
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortMenu;