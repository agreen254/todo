"use client";

import { cn } from "@/utils/cn";
import { ReactNode, useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import { Button } from "../ui/button";

type Props = {
  tag: string;
  handleClick?: (tag: string) => void;
  children?: ReactNode;
};

const TagBadge = ({ tag, handleClick, children }: Props) => {
  const {
    state: {
      tags: { allTags: all },
    },
  } = useContext(TodoContext);

  const getBg = () => {
    const baseCn =
      "px-3 py-2 h-8 m-0 rounded-[1rem] text-sm font-semibold dark:font-bold hover:scale-110 transition-all";
    const storedTag = all.find((t) => t.name === tag);

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
    [1, "bg-red-700/50"],
    [2, "bg-red-900/50"],
    [3, "bg-orange-500/50"],
    [4, "bg-orange-700/50"],
    [5, "bg-orange-900/50"],
    [6, "bg-yellow-500/50"],
    [7, "bg-yellow-700/50"],
    [8, "bg-yellow-900/50"],
    [9, "bg-teal-500/50"],
    [10, "bg-teal-700/50"],
    [11, "bg-teal-900/50"],
    [12, "bg-green-500/50"],
    [13, "bg-green-700/50"],
    [14, "bg-green-900/50"],
    [15, "bg-sky-500/50"],
    [16, "bg-sky-700/50"],
    [17, "bg-sky-900/50"],
    [18, "bg-blue-500/50"],
    [19, "bg-blue-700/50"],
    [20, "bg-blue-900/50"],
    [21, "bg-purple-500/50"],
    [22, "bg-purple-700/50"],
    [23, "bg-purple-900/50"],
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
