"use client";

import TodoContext from "../contexts/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoReducer } from "../reducers/todoReducer";
import {
  getCompletedTodos,
  getPendingTodos,
  getPinnedTodos,
  sortTodos,
} from "../utils/todoHelpers";
import { Actions, Todo, TodoSortOrder } from "../utils/todoTypes";

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [tags, setTags] = useLocalStorage<string[]>("tags", []);
  const [sortOrder, setSortOrder] = useLocalStorage<TodoSortOrder>(
    "sortOrder",
    "default"
  );

  // abstract away all the setters
  const dispatch = (action: Actions) => {
    todoReducer(todos, setTodos, setSortOrder, action);
  };

  const todoState = {
    all: todos,
    completed: sortTodos(getCompletedTodos(todos), sortOrder),
    pending: sortTodos(getPendingTodos(todos), sortOrder),
    pinned: sortTodos(getPinnedTodos(todos), sortOrder),
  };

  return (
    <TodoContext.Provider value={{ todoState, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
