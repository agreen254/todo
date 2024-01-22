"use client";

import { useContext, useState } from "react";
import TodoContext from "@/contexts/TodoContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import TagBadge from "../TodoCard/TodoCardTagBadge";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../ui/button";
import { colorsMap } from "@/utils/maps";

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

  const bgColor = (tag: string) => {
    const n = allTags.find((t) => t.name === tag);
    return n ? colorsMap.get(n.color) : "";
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
            <p className="text-muted-foreground text-sm italic">
              no tags selected
            </p>
          )}
          {formTags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded-[1rem] text-sm font-semibold dark:font-bold ${bgColor(
                tag
              )}`}
            >
              {tag}
              <Button
                variant="ghost"
                className="p-0 my-0 mr-0 ml-1 w-4 h-4 translate-y-1"
              >
                <X
                  className="w-4 h-4 inline-block"
                  onClick={() => setFormTags(formTags.filter((t) => t !== tag))}
                />
              </Button>
            </span>
          ))}
        </p>
      </div>
      <div className="space-x-2">
        {allTags.map((tag) => (
          <TagBadge
            key={tag.name}
            tag={tag.name}
            addTag={() => handleAddTags(tag.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default AddTags;
