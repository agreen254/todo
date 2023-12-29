"use client";

import TodoContext from "../contexts/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoReducer } from "../reducers/todoReducer";
import {
  getCompletedTodos,
  getPendingTodos,
  getPinnedTodos,
} from "../utils/todoHelpers";
import { Actions, Todo } from "../utils/todoTypes";

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  // abstract away the "setTodos" function
  const dispatch = (action: Actions) => todoReducer(todos, setTodos, action);

  // const completedTodos = getCompletedTodos(todos);
  // const pendingTodos = getPendingTodos(todos);
  // const pinnedTodos = getPinnedTodos(todos);

  const todoState = {
    all: todos,
    completed: getCompletedTodos(todos),
    pending: getPendingTodos(todos),
    pinned: getPinnedTodos(todos),
  };

  return (
    <TodoContext.Provider value={{ todoState, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
