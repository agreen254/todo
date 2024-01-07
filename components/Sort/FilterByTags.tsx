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
import { Tag } from "@/utils/types";

const FilterByTags = () => {
  const {
    state: {
      tags: { allTags, filterTags },
    },
    dispatch,
  } = useContext(TodoContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheck = (tag: Tag) => {
    if (filterTags.includes(tag.name)) {
      const newTags = filterTags.filter((name) => name !== tag.name);
      dispatch({ cmd: "SET_FILTER_TAGS", tags: newTags });
    } else {
      dispatch({ cmd: "SET_FILTER_TAGS", tags: [...filterTags, tag.name] });
    }
  };

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
      <PopoverContent className="max-w-[200px] w-[95vw] hover:border-primary transition-colors">
        {allTags.map((tag) => (
          <div className="flex items-end mb-2" key={tag.name}>
            <Checkbox
              id={tag.name}
              className="mr-1"
              checked={filterTags.includes(tag.name)}
              onClick={() => handleCheck(tag)}
            />
            <Label htmlFor={tag.name}>{tag.name}</Label>
          </div>
        ))}
        <Separator className="w-full my-2" />
        <p className="text-sm text-muted-foreground">current selected tags:</p>
        <p className="text-sm text-muted-foreground">
          {filterTags.map((tagName) => (
            <span key={tagName + "span"}>{`${tagName} `}</span>
          ))}
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default FilterByTags;
