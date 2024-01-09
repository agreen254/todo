import { Todo } from "./types";

export default function filterByTags(
  todos: Todo[],
  filterTagNames: string[],
  method: "inclusive" | "exclusive"
) {
  function isValidExclusive(t: Todo) {
    return filterTagNames.every((tag) => t.tags.includes(tag));
  }
  function isValidInclusive(t: Todo) {
    return t.tags.some((tag) => filterTagNames.includes(tag));
  }

  if (!filterTagNames.length) return todos;
  if (method === "exclusive") {
    return todos.filter((t) => isValidExclusive(t));
  } else if (method === "inclusive") {
    return todos.filter((t) => isValidInclusive(t));
  } else return todos;
}
