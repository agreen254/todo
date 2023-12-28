import React from "react";
import { Actions } from "../reducer/todoReducer";

type todoStateContextType = {
  dispatch: React.Dispatch<Actions>;
};

const TodosProvider = React.createContext<todoStateContextType>(
  {} as todoStateContextType
);

export default TodosProvider;
