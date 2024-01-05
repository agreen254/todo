import { distance } from "fastest-levenshtein";
import { sort } from "fast-sort";
import { LevDistance, Todo } from "./types";

export default function search(
  query: string,
  todos: Todo[],
  tolerance: number
) {
  const queryLowered = query.toLowerCase();

  const search = todos.reduce((valid: LevDistance[], t): LevDistance[] => {
    const nameLowered = t.name.toLowerCase();
    const dist = distance(queryLowered, nameLowered);

    return dist <= tolerance ? [...valid, { t: t, distance: dist }] : valid;
  }, []);

  return sort(search).asc((ele) => ele.distance);
}
