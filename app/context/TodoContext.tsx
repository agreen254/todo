"use client";

import React from "react";
import { Todo } from "../types";

type todoContextType = {
  todos: Todo[];
  addTodo: (toAdd: Todo) => void;
  deleteTodo: (toDelete: Todo) => void;
};

const TodoContext = React.createContext<todoContextType>({} as todoContextType);

export default TodoContext;
