import { SplitTodos, Todo, TodoSortOrder } from "./types";
import filterByTags from "./filterByTags";
import sortTodos from "./sortTodos";
import splitTodos from "./splitTodos";

export default function processTodos(
  todos: Todo[],
  sortOrder: TodoSortOrder,
  filterTags: string[]
): SplitTodos {
  const filtered = filterByTags(todos, filterTags);
  const sorted = sortTodos(filtered, sortOrder);
  return splitTodos(sorted);
}
