"use client";

import TodoContext from "../contexts/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoReducer } from "../reducers/todoReducer";
import splitTodos from "@/utils/splitTodos";
import sortTodos from "@/utils/sortTodos";
import { Actions, Tag, Todo, TodoSortOrder } from "../utils/types";
import filterByTags from "@/utils/filterByTags";

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

  const filteredTodos = filterByTags(todos, filterTags);
  const sortedTodos = sortTodos(filteredTodos, sortOrder);
  const {
    completedTodos: completed,
    pendingTodos: pending,
    pinnedTodos: pinned,
  } = splitTodos(sortedTodos);

  const state = {
    todos: {
      allTodos: todos,
      completedTodos: completed,
      pendingTodos: pending,
      pinnedTodos: pinned,
    },
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
