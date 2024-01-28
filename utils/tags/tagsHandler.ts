import newTag from "./newTag";
import { Tag } from "../types";

export default function tagsHandler(
  storedTags: Tag[],
  tagsFromTodo: string[],
  setTags: (tags: Tag[]) => void
): void {
  const tagsToAdd = tagsFromTodo.reduce((shouldAdd, tag) => {
    if (!storedTags.some((t) => t.name === tag)) {
      return [...shouldAdd, newTag(tag, storedTags.length + shouldAdd.length)];
    } else {
      return shouldAdd;
    }
  }, [] as Tag[]);

  setTags([...storedTags, ...tagsToAdd]);
}
