import { distance } from "fastest-levenshtein";
import { sort } from "fast-sort";
import { LevDistance, Todo } from "./types";

export default function search(
  query: string,
  todos: Todo[],
  tolerance: number
): Todo[] {
  if (query === "") return todos;

  const processedQuery = query.toLowerCase().trim();

  const validTodos = todos.reduce((valid: LevDistance[], t): LevDistance[] => {
    let nameLowered = t.name.toLowerCase();

    // So the user doesn't have to input the entire title to get a match.
    // If the query has similar letters as the start of the todo name, the query will be considered valid.
    if (processedQuery.length < nameLowered.length) {
      nameLowered = nameLowered.slice(0, processedQuery.length);
    }

    const dist = distance(processedQuery, nameLowered);

    return dist <= tolerance ? [...valid, { t: t, distance: dist }] : valid;
  }, []);

  return sort(validTodos)
    .asc((lev) => lev.distance)
    .map((lev) => lev.t);
}
