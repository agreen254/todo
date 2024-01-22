"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import { colorsMap } from "@/utils/maps";

const TagBadge = ({ tag }: { tag: string }) => {
  const {
    state: {
      tags: { allTags: all },
    },
  } = useContext(TodoContext);

  const storedTag = all.find((t) => t.name === tag);
  if (!storedTag) return;

  const cn = colorsMap.get(storedTag.color)!;

  return (
    <span
      className={`px-3 py-2 rounded-[1rem] text-sm font-semibold dark:font-bold ${cn}`}
    >
      {storedTag.name}
    </span>
  );
};

export default TagBadge;
