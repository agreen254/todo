import { sort } from "fast-sort";
import { Todo, TodoSortOrder } from "./types";

export default function sortTodos(
  toSort: Todo[],
  sortOrder: TodoSortOrder & "powerMode"
): Todo[] {
  switch (sortOrder) {
    case "name_asc": {
      return sort(toSort).by([
        { asc: (t) => t.name },
        // will fall back to this when needed to have a unique sorting point
        // then if they happen to have the exact same ISO they will not be sorted further
        { desc: (t) => t.createdAt },
      ]);
    }
    case "name_desc":
      return sort(toSort).by([
        { desc: (t) => t.name },
        { desc: (t) => t.createdAt },
      ]);
    case "createdAt_asc":
      return sort(toSort).asc([(t) => t.createdAt]);
    case "createdAt_desc":
      return sort(toSort).desc([(t) => t.createdAt]);
    case "dueAt_asc":
      return sort(toSort).by([
        { asc: (t) => t?.dueAt },
        { desc: (t) => t.createdAt },
      ]);
    case "dueAt_desc":
      return sort(toSort).by([
        { desc: (t) => t?.dueAt },
        { desc: (t) => t.createdAt },
      ]);
    case "priority_asc":
      return sort(toSort).by([
        { asc: (t) => t.priority },
        { desc: (t) => t.createdAt },
      ]);
    case "priority_desc":
      return sort(toSort).by([
        { desc: (t) => t.priority },
        { desc: (t) => t.createdAt },
      ]);
    case "complexity_asc":
      return sort(toSort).by([
        { asc: (t) => t.complexity },
        { desc: (t) => t.createdAt },
      ]);
    case "complexity_desc":
      return sort(toSort).by([
        { desc: (t) => t.complexity },
        { desc: (t) => t.createdAt },
      ]);
    case "powerMode":
      return sort(toSort).by([
        { asc: (t) => t.complexity + t.priority },
        { desc: (t) => t.createdAt },
      ]);
    default:
      return sort(toSort).asc([(t) => t.createdAt]);
  }
}
