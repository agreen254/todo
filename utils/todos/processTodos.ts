import { SplitTodos, Todo, TodoSortOrder } from "../types";
import filterByTags from "../tags/filterByTags";
import sortTodos from "./sortTodos";
import splitTodos from "./splitTodos";

export default function processTodos(
  todos: Todo[],
  sortOrder: {
    pending: TodoSortOrder;
    completed: TodoSortOrder;
  },
  filterTags: {
    pending: string[],
    completed: string[],
  },
  filterTagsSchema: "exclusive" | "inclusive"
): SplitTodos {
  const { pinnedTodos, pendingTodos, completedTodos } = splitTodos(todos);

  const filteredPending = filterByTags(
    [...pinnedTodos, ...pendingTodos],
    filterTags.pending,
    filterTagsSchema
  );
  const sortedPending = sortTodos(filteredPending, sortOrder.pending);

  const filteredCompleted = filterByTags(
    completedTodos,
    filterTags.completed,
    filterTagsSchema
  );
  const sortedCompleted = sortTodos(filteredCompleted, sortOrder.completed);

  return {
    pinnedTodos: sortedPending.filter((t) => t.isPinned),
    pendingTodos: sortedPending.filter((t) => !t.isPinned && !t.isCompleted),
    completedTodos: sortedCompleted.filter((t) => t.isCompleted),
  };
}
