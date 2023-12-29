"use client";

import React from "react";
import { Todo } from "../types";
import { todoReducer } from "../reducers/todoReducer";

type todoContextType = {
  todos: Todo[];
  setTodos: (t: Todo[]) => void;
  reducer: typeof todoReducer;
};

const TodoContext = React.createContext<todoContextType>({} as todoContextType);

export default TodoContext;
