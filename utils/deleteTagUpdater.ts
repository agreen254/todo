import tagCount from "./tagCount";
import { Tag, Todo } from "./types";

export default function deleteTagUpdater(
  todos: Todo[],
  tags: Tag[],
  setTags: (tags: Tag[]) => void,
  name: string
) {
  const count = tagCount(todos, name);
  if (count === 1) {
    setTags(tags.filter((tag) => tag.name !== name));
  }
}
