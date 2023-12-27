import { sort } from "fast-sort";
import { Todo } from "../types";

export default function sortTodos(todos: Todo[], sortOrder: string) {
  switch (sortOrder) {
    case "name_asc":
      return sort(todos).by([
        { asc: (t) => t.name },
        { desc: (t) => t.created_at },
      ]);
    case "name_desc":
      return sort(todos).by([
        { desc: (t) => t.name },
        { desc: (t) => t.created_at },
      ]);
    case "createdAt_asc":
      return sort(todos).asc([(t) => t.created_at]);
    case "createdAt_desc":
      return sort(todos).desc([(t) => t.created_at]);
  }
}
