import { SplitTodos, Todo, TodoSortOrder } from "./types";
import filterByTags from "./filterByTags";
import sortTodos from "./sortTodos";
import splitTodos from "./splitTodos";

export default function processTodos(
  todos: Todo[],
  sortOrder: TodoSortOrder,
  filterTags: string[],
  filterTagsSchema: "exclusive" | "inclusive"
): SplitTodos {
  const filtered = filterByTags(todos, filterTags, filterTagsSchema);
  const sorted = sortTodos(filtered, sortOrder);
  return splitTodos(sorted);
}
