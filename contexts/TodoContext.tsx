import { createContext } from "react";
import { TodoContextType } from "../utils/types";

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export default TodoContext;
