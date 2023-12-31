import { Todo } from "@/utils/todoTypes";
import TodoCard from "./TodoCard";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return todos.map((t) => (
    <TodoCard
      key={t.id + "pinned"}
      t={t}
      className="min-w-[80vw] md:min-w-[20vw] md:max-w-[30vw] mx-4 my-4"
    />
  ));
};

export default TodoList;
