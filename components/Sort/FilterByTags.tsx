"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { FilterTagsSchema, Tag } from "@/utils/types";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import MenuChevron from "../MenuChevron";
import { useTodo } from "@/providers/TodoProvider";

// If we provide a setter to this component, it tells the component
// that the state not persisted in the local storage.
type Props = {
  filterTags: string[];
  setFilterTags: (tags: string[]) => void;
  setFilterTagsSchema: (sch: FilterTagsSchema) => void;
};

const FilterByTags = ({
  filterTags,
  setFilterTags,
  setFilterTagsSchema,
}: Props) => {
  const {
    state: {
      tags: { allTags },
    },
  } = useTodo();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheck = (tag: Tag) => {
    if (filterTags.includes(tag.name)) {
      const newTags = filterTags.filter((name) => name !== tag.name);
      setFilterTags(newTags);
    } else {
      setFilterTags([...filterTags, tag.name]);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="transition-all hover:scale-[1.05]">
          <MenuChevron name="tags" isOpen={isOpen} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="max-w-[200px] w-[95vw] hover:border-primary transition-colors"
      >
        {allTags.map((tag) => (
          <div className="flex items-end mb-2" key={tag.name}>
            <Checkbox
              id={tag.name}
              className="mr-1"
              checked={filterTags.includes(tag.name)}
              onClick={() => handleCheck(tag)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCheck(tag);
                }
              }}
            />
            <Label htmlFor={tag.name}>{tag.name}</Label>
          </div>
        ))}
        <Separator className="w-full mb-2 mt-3" />
        <RadioGroup
          defaultValue="exclusive"
          onValueChange={(v: FilterTagsSchema) => setFilterTagsSchema(v)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="exclusive" id="r1" />
            <Label htmlFor="r1">exclusive select</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inclusive" id="r2" />
            <Label htmlFor="r2">inclusive select</Label>
          </div>
        </RadioGroup>
        <Separator className="w-full mb-2 mt-3" />
        <p className="text-sm text-muted-foreground">
          selected tags: {filterTags.length === 0 && "N/A"}
        </p>
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
