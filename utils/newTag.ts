import { Tag } from "./types";

export default function newTag(name: string): Tag {
  return {
    name: name,
    color: Math.floor(Math.random() * 24),
  };
}
