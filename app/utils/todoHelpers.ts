import { Todo } from "../types";

export function getCompletedTodos(todos: Todo[]) {
  return todos.filter((t) => t.isCompleted);
}

export function getPendingTodos(todos: Todo[]) {
  return todos.filter((t) => !t.isCompleted && !t.isPinned);
}

export function getPinnedTodos(todos: Todo[]) {
  return todos.filter((t) => t.isPinned);
}
