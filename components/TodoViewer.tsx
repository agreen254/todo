import { Todo } from "@/utils/types";
import TodoCard from "./TodoCard/TodoCard";

const TodoViewer = ({ t }: { t: Todo }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <TodoCard t={t} />
    </div>
  );
};

export default TodoViewer;
