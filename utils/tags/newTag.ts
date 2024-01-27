import { Tag } from "../types";

export default function newTag(newTagName: string, numTags: number): Tag {
  const tagNum = numTags > 23 ? numTags % 24 : numTags;
  return {
    name: newTagName,
    color: tagNum,
  };
}
