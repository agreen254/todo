import { sort } from "fast-sort";
import { Todo, TodoSortOrder } from "./types";

export function getCompletedTodos(todos: Todo[]): Todo[] {
  return todos.filter((t) => t.isCompleted);
}

export function getPendingTodos(todos: Todo[]): Todo[] {
  return todos.filter((t) => !t.isCompleted && !t.isPinned);
}

export function getPinnedTodos(todos: Todo[]): Todo[] {
  return todos.filter((t) => t.isPinned);
}

export function sortTodos(toSort: Todo[], sortOrder: TodoSortOrder): Todo[] {
  switch (sortOrder) {
    case "name_asc":
      return sort(toSort).by([
        { asc: (t) => t.name },
        // will fall back to this when needed to have a unique sorting point
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "name_desc":
      return sort(toSort).by([
        { desc: (t) => t.name },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "createdAt_asc":
      return sort(toSort).asc([(t) => t.createdAt]);
    case "createdAt_desc":
      return sort(toSort).desc([(t) => t.createdAt]);
    case "dueAt_asc":
      return sort(toSort).by([
        { asc: (t) => t.dueAt?.toUnixInteger },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "dueAt_desc":
      return sort(toSort).by([
        { desc: (t) => t.dueAt?.toUnixInteger },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "priority_asc":
      return sort(toSort).by([
        { asc: (t) => t.priority },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "priority_desc":
      return sort(toSort).by([
        { desc: (t) => t.priority },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "complexity_asc":
      return sort(toSort).by([
        { asc: (t) => t.complexity },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "complexity_desc":
      return sort(toSort).by([
        { desc: (t) => t.complexity },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    default:
      return sort(toSort).asc([(t) => t.createdAt.toUnixInteger]);
  }
}