import { Todo } from "@/utils/types";
import TodoCard from "./TodoCard";

const TodoMapper = ({ todos }: { todos: Todo[] }) => {
  return todos.map((t) => (
    <TodoCard
      key={t.id}
      t={t}
      className="min-w-[80vw] md:min-w-[40vw] lg:min-w-[30vw] lg:max-w-[40vw] xl:w-[auto] xl:max-w-[30vw] mx-4 my-4"
    />
  ));
};

export default TodoMapper;
