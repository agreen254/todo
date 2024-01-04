import tagCount from "./tagCount";
import { Tag } from "./types";

export default function deleteTagUpdater(
  tags: Tag[],
  setTags: (tags: Tag[]) => void,
  name: string
) {
  const count = tagCount(tags, name);
  if (count === 1) {
    const newTags = tags.filter((tag) => tag.name !== name);
    setTags(newTags);
  }
}
