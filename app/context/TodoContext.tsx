import React from "react";
import { Actions, Todo } from "../types";

type todoContextType = {
  todos: Todo[];
  dispatch: (action: Actions) => void;
};

const TodoContext = React.createContext<todoContextType>({} as todoContextType);

export default TodoContext;
