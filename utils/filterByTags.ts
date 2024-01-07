import { Todo } from "./types";

export default function filterByTags(todos: Todo[], filterTagNames: string[]) {
  function isValid(t: Todo) {
    return filterTagNames.every((tag) => t.tags.includes(tag));
  }

  if (!filterTagNames.length) return todos;
  return todos.filter((t) => isValid(t));
}
