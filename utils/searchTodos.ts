import { distance } from "fastest-levenshtein";
import { sort } from "fast-sort";
import dueAtString from "./parseDueAt";
import { SearchSpecifier, Todo } from "./types";

export default function searchTodos(
  query: string,
  kind: string,
  todos: Todo[]
): Todo[] {
  if (query === "") return todos;

  const processedQuery = query.toLowerCase().trim();
  function isValid(t: Todo) {
    switch (kind) {
      case "description": {
        return t.description?.toLowerCase().includes(processedQuery) ? [t] : [];
      }
      case "dueAt": {
        return dueAtString(t.dueAt).toLowerCase().includes(processedQuery)
          ? [t]
          : [];
      }
      case "name":
      default: {
        return t.name.toLowerCase().includes(processedQuery) ? [t] : [];
      }
    }
  }

  const validTodos = todos.reduce((valid: Todo[], t): Todo[] => {
    return [...valid, ...isValid(t)];
  }, []);

  return validTodos;
}
