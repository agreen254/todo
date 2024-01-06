"use client";

import { useContext, useState } from "react";
import TodoContext from "@/contexts/TodoContext";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "../ui/label";

const FilterByTags = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { tags },
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
        <Button>tags {handleChevron()}</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] w-[95vw] hover:ring-2 hover:ring-ring">
        <p className="text-sm text-muted-foreground">current selected tags:</p>
        <Separator className="w-full my-2" />
        {tags.map((tag) => (
          <div className="flex items-end mb-2">
            <Checkbox id={tag.name} className="mr-1" />
            <Label htmlFor={tag.name}>{tag.name}</Label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default FilterByTags;
