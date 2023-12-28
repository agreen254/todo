import React from "react";
import { Actions } from "../reducer/todoReducer";
import { Todo } from "../types";

type todoContextType = {
  todos: Todo[];
  dispatch: React.Dispatch<Actions>;
};

const TodoContext = React.createContext<todoContextType>({} as todoContextType);

export default TodoContext;
