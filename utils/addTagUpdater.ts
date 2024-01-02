import tagCount from "./tagCount";
import { Tag, Todo } from "./types";

export default function addTagUpdater(
  todos: Todo[],
  tags: Tag[],
  setTags: (tags: Tag[]) => void,
  name: string
) {
  const count = tagCount(todos, name);
  if (count === 0) {
    const newTag: Tag = {
      name: name,
      color: Math.floor(Math.random() * 24),
    };
    setTags([...tags, newTag]);
  }
}
