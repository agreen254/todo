import { Pin } from "lucide-react";
import TodoCard, { Props } from "./TodoCard";

const PinnedTodoCard = ({ t, todos, setTodos }: Props) => {
  return (
    <div className="mb-4">
      <div className="bg-teal-500 mb-0 rounded-tr-md rounded-tl-md">
        <span>
          <Pin className="w-10 h-10 py-2 inline-block rotate-45 text-black dark:text-white" />
          <span className="text-lg italic font-bold">Pinned</span>
        </span>
      </div>
      <TodoCard t={t} todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default PinnedTodoCard;
