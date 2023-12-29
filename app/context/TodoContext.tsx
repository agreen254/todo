"use client";

import React from "react";
import { Todo } from "../types";
import { todoReducer } from "../reducers/todoReducerTwo";

type todoContextType = {
  todos: Todo[];
  setTodos: (t: Todo[]) => void;
  // addTodo: (toAdd: Todo) => void;
  // deleteTodo: (toDelete: Todo) => void;
  reducer: typeof todoReducer;
};

const TodoContext = React.createContext<todoContextType>({} as todoContextType);

export default TodoContext;
