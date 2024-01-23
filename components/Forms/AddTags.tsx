"use client";

import { useContext, useState } from "react";
import TodoContext from "@/contexts/TodoContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import TagBadge from "../TodoCard/TodoCardTagBadge";
import { Plus, X } from "lucide-react";
import { cn } from "@/utils/cn";

const AddTags = () => {
  const {
    state: {
      tags: { allTags },
    },
  } = useContext(TodoContext);
  const [formTags, setFormTags] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>("");

  const handleAddTags = (input: string) => {
    const processedTags = input
      .toLowerCase()
      .split(",")
      .map((tag) => tag.trim());

    const newTags = processedTags.filter((tag) => !formTags.includes(tag));
    setFormTags([...formTags, ...newTags]);
    setCurrent("");
  };

  return (
    <div className="mt-[20vh] w-[320px]">
      <div className="flex flex-col space-y-2 mb-4">
        <Label htmlFor="tags">Tags:</Label>
        <Input
          id="tags"
          placeholder="Enter tags"
          value={current}
          onChange={(e) => setCurrent(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTags(current);
          }}
        />
      </div>
      <div
        className={cn(
          "max-h-[6rem] overflow-y-auto mb-4 px-5 py-3 border rounded-full"
        )}
      >
        <p className="flex flex-wrap">
          {formTags.length === 0 && (
            <span className="text-muted-foreground text-sm italic">
              no tags selected
            </span>
          )}
          {formTags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              handleClick={() => setFormTags(formTags.filter((t) => t !== tag))}
            >
              {tag}
              <X className="w-4 h-4 ml-1" />
            </TagBadge>
          ))}
        </p>
      </div>
      <div className="space-x-2">
        {allTags.map((tag) => (
          <TagBadge
            key={tag.name}
            tag={tag.name}
            handleClick={() => handleAddTags(tag.name)}
          >
            {tag.name}
            <Plus className="w-4 h-4 ml-1" />
          </TagBadge>
        ))}
      </div>
    </div>
  );
};

export default AddTags;
