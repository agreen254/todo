import newTag from "./newTag";
import { Tag } from "./types";

export default function addTodoTagsHandler(
  storedTags: Tag[],
  tagsFromTodo: string[],
  setTags: (tags: Tag[]) => void
) {
  const tagsToAdd = tagsFromTodo.reduce((shouldAdd, tag) => {
    if (!storedTags.some((t) => t.name === tag)) {
      return [...shouldAdd, newTag(tag)];
    } else {
      return shouldAdd;
    }
  }, [] as Tag[]);

  setTags([...storedTags, ...tagsToAdd]);
}
