import { Todo } from "@/utils/types";
import TodoCard from "./TodoCard/TodoCard";

const TodoMapper = ({ todos }: { todos: Todo[] }) => {
  return todos.map((t) => (
    <TodoCard
      key={t.id}
      t={t}
      className="w-[90vw] md:w-[auto] md:min-w-[0vw] lg:min-w-[0vw] lg:max-w-[40vw] xl:max-w-[30vw] mx-4 my-4"
    />
  ));
};

export default TodoMapper;
