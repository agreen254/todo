import { Tag } from "./types";

export default function tagNames(tags: Tag[]) {
  return tags.map((tag) => tag.name);
}
