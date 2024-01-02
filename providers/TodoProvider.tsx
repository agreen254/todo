"use client";

import TodoContext from "../contexts/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoReducer } from "../reducers/todoReducer";
import { filterTodos } from "../utils/helpers";
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
    todoReducer(
      todos,
      setTodos,
      sortOrder,
      setSortOrder,
      tags,
      setTags,
      action
    );
  };

  const { completed, pending, pinned } = filterTodos(todos);

  const state = {
    all: todos,
    completed: completed,
    pending: pending,
    pinned: pinned,
    sortOrder: sortOrder,
    tags: tags,
  };

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
