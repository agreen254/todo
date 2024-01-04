import { Todo, Tag } from "./types";

// I want to check to see if a tag exists.
// If the tag doesn't already exist, I need to create a new one and place it into the local storage.
// If the tag already exists, I don't need to do anything.

// isLastOccurrence -> check the todos
// DNE -> check the todos

export default function tagCount(todos: Todo[], toCount: string) {
  return todos.reduce((n, t) => {
    return toCount === t.name ? n + 1 : n;
  }, 0);
}
