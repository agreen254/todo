"use client";

import TodoContext from "../contexts/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoReducer } from "../reducers/todoReducer";
import {
  getCompletedTodos,
  getPendingTodos,
  getPinnedTodos,
  sortTodos,
} from "../utils/helpers";
import { Actions, Tag, Todo, TodoSortOrder } from "../utils/types";

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);
  const [sortOrder, setSortOrder] = useLocalStorage<TodoSortOrder>(
    "sortOrder",
    "default"
  );

  // abstract away all the setters
  const dispatch = (action: Actions) => {
    todoReducer(todos, setTodos, sortOrder, setSortOrder, action);
  };

  const todoState = {
    all: todos,
    completed: sortTodos(getCompletedTodos(todos), sortOrder),
    pending: sortTodos(getPendingTodos(todos), sortOrder),
    pinned: sortTodos(getPinnedTodos(todos), sortOrder),
    sortOrder: sortOrder,
    tags: tags,
  };

  return (
    <TodoContext.Provider value={{ todoState, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
