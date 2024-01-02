import { cn } from "@/utils/cn";
import { randColor, randArrayEle } from "@/utils/helpers";
import { Tag } from "@/utils/types";

const TagUnit = ({ tag }: { tag: Tag }) => {
  if (!tag.color) return;

  const colors = [
    "bg-red-500/50",
    "bg-red-700/50",
    "bg-red-900/50",
    "bg-orange-500/50",
    "bg-orange-700/50",
    "bg-orange-900/50",
    "bg-yellow-500/50",
    "bg-yellow-700/50",
    "bg-yellow-900/50",
    "bg-teal-500/50",
    "bg-teal-700/50",
    "bg-teal-900/50",
    "bg-green-500/50",
    "bg-green-700/50",
    "bg-green-900/50",
    "bg-blue-500/50",
    "bg-blue-700/50",
    "bg-blue-900/50",
    "bg-purple-500/50",
    "bg-purple-700/50",
    "bg-purple-900/50",
  ];
  const myColor = randArrayEle(colors);

  return (
    <span className={`px-3 py-2 rounded-[1rem] ${myColor}`}>{tag.name}</span>
  );
};

export default TagUnit;
