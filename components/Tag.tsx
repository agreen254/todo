import { Tag } from "@/utils/types";

const TagUnit = ({ tag }: { tag: Tag }) => {
  if (!tag.color) return;

  const colors = new Map<number, string>([
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
  const tagColor = colors.get(tag.color);

  return (
    <span className={`px-3 py-2 rounded-[1rem] text-sm font-bold ${tagColor}`}>
      {tag.name}
    </span>
  );
};

export default TagUnit;
