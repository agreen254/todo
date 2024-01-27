import { Tag } from "../types";

export default function tagNames(tags: Tag[]): string[] {
  return tags.map((tag) => tag.name);
}
