import { Tag } from "../types";

export default function fetchTags(
  storedTags: Tag[],
  tagsFromTodo: string[] | undefined
) {
  if (!tagsFromTodo) return [];
  return tagsFromTodo.reduce((tags, tag) => {
    const foundTag = storedTags.find((t) => t.name === tag);
    return foundTag ? [...tags, foundTag] : tags;
  }, [] as Tag[]);
}
