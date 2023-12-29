import { createContext } from "react";
import { TodoContextType } from "../todoTypes";

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export default TodoContext;
