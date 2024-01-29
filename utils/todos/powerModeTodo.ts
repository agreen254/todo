import { Todo } from "../types";
import sortTodos from "./sortTodos";

export default function powerModeTodo(pendingTodos: Todo[]) {
  return sortTodos(pendingTodos, "powerMode")[0]; 
}