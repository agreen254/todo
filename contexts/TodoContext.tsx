import { createContext } from "react";
import { TodoContextType } from "../utils/todoTypes";

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export default TodoContext;
