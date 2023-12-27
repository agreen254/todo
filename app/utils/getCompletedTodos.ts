import { Todo } from "../types";

export default function (todos: Todo[]) {
  return todos.filter((t) => t.isCompleted);
}
