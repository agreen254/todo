import { distance } from "fastest-levenshtein";
import { sort } from "fast-sort";
import type { Lev } from "./types";

export default function search(
  query: string,
  items: string[],
  tolerance: number
) {
  const search = items.reduce((valid: Lev[], item) => {
    const d = distance(query, item);
    return d <= tolerance ? [...valid, { name: item, distance: d }] : valid;
  }, []);
  return sort(search).asc((ele) => ele.distance);
}
