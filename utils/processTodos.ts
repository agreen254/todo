import { SplitTodos, TodoContextState } from "./types";
import filterByTags from "./filterByTags";
import sortTodos from "./sortTodos";
import splitTodos from "./splitTodos";

export default function processTodos(state: TodoContextState): SplitTodos {
  const filtered = filterByTags(state.todos, state.tags.filterTags);
  const sorted = sortTodos(filtered, state.sortOrder);
  return splitTodos(sorted);
}
