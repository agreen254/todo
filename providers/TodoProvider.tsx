"use client";

import TodoContext from "../contexts/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoReducer } from "../reducers/todoReducer";
import { Actions, Tag, Todo, TodoSortOrder } from "../utils/types";

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);
  const [filterTags, setFilterTags] = useLocalStorage<string[]>(
    "filterTags",
    []
  );
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
      setFilterTags,
      action
    );
  };

  const state = {
    todos: todos,
    sortOrder: sortOrder,
    tags: {
      allTags: tags,
      filterTags: filterTags,
    },
  };

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
