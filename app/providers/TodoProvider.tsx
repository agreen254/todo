"use client";

import TodoContext from "../context/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoReducer as reducer } from "../reducers/todoReducer";
import { Todo } from "../types";

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  return (
    <TodoContext.Provider value={{ todos, setTodos, reducer }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
