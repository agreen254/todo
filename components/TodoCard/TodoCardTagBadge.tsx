"use client";

import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";

const TagBadge = ({ tag }: { tag: string}) => {
  if (!tag) return;

  // You cannot render classNames in tailwind by directly using props that you pass
  // to a component, you must map the props to a static className.
  // The color property of the tag type is an integer that serves as a key to this map.
  // It is retrieved at runtime so tailwind can render the background color.
  // The color will not properly show if you move the map to another file and then import it,
  // the raw className strings must be present in this file!
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
  const cn = colorsMap.get(tag.color)!;

  return (
    <span className={`px-3 py-2 rounded-[1rem] text-sm font-bold ${cn}`}>
      {tag.name}
    </span>
  );
};

export default TagBadge;
