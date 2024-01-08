import { Tag } from "./types";
import { unstable_noStore } from "next/cache";

export default function newTag(name: string): Tag {
  // Nextjs will cache this data without use of the unstable_noStore() method.
  // That is, the order of all "random" colors generated will be the same.
  // https://youtu.be/C8OhOU-4l74?t=616
  // Explained in the context of an API endpoint, but the cache behavior is still present for this function.
  unstable_noStore();
  return {
    name: name,
    color: Math.floor(Math.random() * 24),
  };
}
