"use client";

import { cn } from "@/utils/cn";
import { Tag } from "@/utils/types";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { useTodo } from "@/providers/TodoProvider";

type Props = {
  tag: string;
  tagObj?: Tag;
  handleClick?: (tag: string) => void;
  children?: ReactNode;
};

const TagBadge = ({ tag, tagObj, handleClick, children }: Props) => {
  const {
    state: {
      tags: { allTags },
    },
  } = useTodo();

  const getBg = () => {
    const baseCn =
      "px-3 py-2 h-8 mr-2 rounded-[1rem] text-sm font-semibold dark:font-bold hover:scale-110 transition-all";
    const storedTag = tagObj || allTags.find((t) => t.name === tag);

    if (!storedTag) {
      return baseCn;
    } else {
      const bgColor = colorsMap.get(storedTag.color);
      return `${baseCn} ${bgColor} hover:${bgColor}`;
    }
  };

  // You cannot render classNames in tailwind by directly using props that you pass
  // to a component, you must map the props to a static className.
  // more info: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  const colorsMap = new Map<number, string>([
    [0, "bg-red-500/50"],
    [1, "bg-sky-500/50"],
    [2, "bg-teal-500/50"],
    [3, "bg-orange-500/50"],
    [4, "bg-yellow-500/50"],
    [5, "bg-green-500/50"],
    [6, "bg-blue-500/50"],
    [7, "bg-purple-500/50"],
    [8, "bg-red-900/50"],
    [9, "bg-sky-900/50"],
    [10, "bg-teal-900/50"],
    [11, "bg-orange-900/50"],
    [12, "bg-yellow-900/50"],
    [13, "bg-green-900/50"],
    [14, "bg-blue-900/50"],
    [15, "bg-purple-900/50"],
    [16, "bg-red-700/50"],
    [17, "bg-sky-700/50"],
    [18, "bg-teal-700/50"],
    [19, "bg-orange-700/50"],
    [20, "bg-yellow-700/50"],
    [21, "bg-green-700/50"],
    [22, "bg-blue-700/50"],
    [23, "bg-purple-700/50"],
  ]);

  return handleClick ? (
    <Button
      className={getBg()}
      type="button"
      variant="ghost"
      onClick={() => handleClick(tag)}
    >
      {children}
    </Button>
  ) : (
    <span className={cn(getBg(), "pt-[5px]")}>{tag}</span>
  );
};

export default TagBadge;
