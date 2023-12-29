"use client";

import TodoContext from "../context/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoReducer } from "../reducers/todoReducer";
import {
  getCompletedTodos,
  getPendingTodos,
  getPinnedTodos,
} from "../utils/todoHelpers";
import { Actions, Todo } from "../todoTypes";

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const dispatch = (action: Actions) => todoReducer(todos, setTodos, action);

  const completedTodos = getCompletedTodos(todos);
  const pendingTodos = getPendingTodos(todos);
  const pinnedTodos = getPinnedTodos(todos);

  const todoState = {
    completed: completedTodos,
    pending: pendingTodos,
    pinned: pinnedTodos,
  };

  return (
    <TodoContext.Provider value={{ todos: todoState, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
