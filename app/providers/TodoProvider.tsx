import { useReducer } from "react";
import TodoContext from "../context/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { Todo } from "../types";
import { todoReducer } from "../reducer/todoReducer";

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [state, dispatch] = useReducer(todoReducer, {} as Todo[]);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
