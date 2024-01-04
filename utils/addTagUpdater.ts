import newTag from "./newTag";
import tagCount from "./tagCount";
import { Tag } from "./types";

export default function addTagUpdater(
  tags: Tag[],
  setTags: (tags: Tag[]) => void,
  name: string
) {
  const count = tagCount(tags, name);
  if (count === 0) {
    const toAdd = newTag(name);
    setTags([...tags, toAdd]);
  }
}
