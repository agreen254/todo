import { sort } from "fast-sort";
import { Todo } from "../todoTypes";

export function getCompletedTodos(todos: Todo[]) {
  return todos.filter((t) => t.isCompleted);
}

export function getPendingTodos(todos: Todo[]) {
  return todos.filter((t) => !t.isCompleted && !t.isPinned);
}

export function getPinnedTodos(todos: Todo[]) {
  return todos.filter((t) => t.isPinned);
}

export function sortTodos(toSort: Todo[], sortOrder: string) {
  switch (sortOrder) {
    case "name_asc":
      return sort(toSort).by([
        { asc: (t) => t.name },
        { desc: (t) => t.createdAt },
      ]);
    case "name_desc":
      return sort(toSort).by([
        { desc: (t) => t.name },
        { desc: (t) => t.createdAt },
      ]);
    case "createdAt_asc":
      return sort(toSort).asc([(t) => t.createdAt]);
    case "createdAt_desc":
      return sort(toSort).desc([(t) => t.createdAt]);
  }
}
