import { cn } from "@/utils/cn";
import { extractColorString } from "@/utils/helpers";
import { Tag } from "@/utils/types";

// Needs hex codes e.g. #121212
const TagUnit = ({ tag }: { tag: Tag }) => {
    if (!tag.colorValue) return;
//   return <span className={cn(extractColorString(tag))}>{tag.name}</span>;
  return <span className="text-[rgb(100 0 100)]">{tag.name}</span>;
};

export default TagUnit;
