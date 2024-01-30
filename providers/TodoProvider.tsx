"use client";

import useLocalStorage from "../hooks/useLocalStorage";
import defaultTags from "@/utils/tags/defaultTags";
import { createContext, useContext } from "react";
import { todoReducer } from "../reducers/todoReducer";
import { TodoContextState, TodoContextType } from "../utils/types";
import { Actions, Tag, Todo, TodoSortOrder } from "../utils/types";

export const TodoContext = createContext<TodoContextType>({} as TodoContextType);
export const useTodo = () => useContext(TodoContext);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", defaultTags);
  const [pendingSortOrder, setPendingSortOrder] =
    useLocalStorage<TodoSortOrder>("pendingSortOrder", "default");
  const [completedSortOrder, setCompletedSortOrder] =
    useLocalStorage<TodoSortOrder>("completedSortOrder", "default");

  // abstract away all the setters
  const dispatch = (action: Actions) => {
    todoReducer(
      todos,
      setTodos,
      pendingSortOrder,
      setPendingSortOrder,
      completedSortOrder,
      setCompletedSortOrder,
      tags,
      setTags,
      action
    );
  };

  const state: TodoContextState = {
    todos: todos,
    sortOrder: {
      pending: pendingSortOrder,
      completed: completedSortOrder,
    },
    tags: {
      allTags: tags,
    },
  };

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
