import { Todo } from "../types";
import sortTodos from "./sortTodos";

export default function powerModeTodo(pendingTodos: Todo[]) {
  if (!!!pendingTodos.length) return undefined;
  return sortTodos(pendingTodos, "powerMode")[0]; 
}