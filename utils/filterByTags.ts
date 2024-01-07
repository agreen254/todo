import { Todo } from "./types";

export default function filterByTags(todos: Todo[], filterTagNames: string[]) {
  function isValid(t: Todo) {
    return t.tags.every((tag) => filterTagNames.includes(tag) || false);
  }

  if (!filterTagNames.length) return todos;
  return todos.filter((t) => isValid(t));
}
