import { cn } from "@/utils/cn";
import { Pin } from "lucide-react";
import TodoCard, { Props } from "./TodoCard";

const PinnedTodoCard = ({ t, className }: Props) => {
  return (
    <div className={cn("mb-4", className)}>
      <div className="bg-teal-500 mb-0 rounded-tr-md rounded-tl-md">
        <span>
          <Pin className="w-10 h-10 py-2 inline-block rotate-45 text-black dark:text-white" />
          <span className="text-lg italic font-bold">Pinned</span>
        </span>
      </div>
      <TodoCard t={t} className="rounded-tr-none rounded-tl-none" />
    </div>
  );
};

export default PinnedTodoCard;
