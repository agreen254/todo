"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import { colorsMap } from "@/utils/maps";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
  tag: string;
  addTag?: (tag: string) => void;
};

const TagBadge = ({ tag, addTag }: Props) => {
  const {
    state: {
      tags: { allTags: all },
    },
  } = useContext(TodoContext);

  const storedTag = all.find((t) => t.name === tag);
  if (!storedTag) return;

  const bg = colorsMap.get(storedTag.color)!;
  const cn = `px-3 py-2 h-8 m-0 rounded-[1rem] text-sm font-semibold dark:font-bold ${bg}`;

  return addTag ? (
    <Button className={cn} variant="ghost" onClick={() => addTag(tag)}>
      {storedTag.name}
      <Plus className="w-4 h-4 ml-1" />
    </Button>
  ) : (
    <span className={cn}>{storedTag.name}</span>
  );
};

export default TagBadge;
