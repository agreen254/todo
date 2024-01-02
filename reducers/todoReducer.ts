import { Actions, Tag, Todo, TodoSortOrder } from "../utils/types";
import { allTagNames } from "@/utils/helpers";

// handles all operations for the raw todo array that is found in local storage
// the raw array is passed into the TodoContext, where it is processed (sorted, split into different parts, etc)
// the processed state is then passed to the provider
export function todoReducer(
  todos: Todo[],
  setTodos: (ts: Todo[]) => void,
  sortOrder: TodoSortOrder,
  setSortOrder: (order: TodoSortOrder) => void,
  tags: Tag[],
  setTags: (tags: Tag[]) => void,
  action: Actions
) {
  switch (action.command) {
    case "ADD_TODO": {
      const newTodos = [...todos, action.toAdd];
      setTodos(newTodos);
      return;
    }
    case "DELETE_TODO": {
      const newTodos = todos.filter((t) => t.id !== action.toDelete.id);
      setTodos(newTodos);
      return;
    }
    case "DELETE_ALL_TODOS": {
      setTodos([]);
      return;
    }
    case "EDIT_TODO": {
      const idx = todos.findIndex((t) => t.id === action.editedTodo.id);
      const newTodos = todos.splice(idx, 1, action.editedTodo);
      setTodos(newTodos);
      return;
    }
    case "COMPLETE_TODO": {
      const newTodos = todos.map((t) =>
        t.id === action.toComplete.id
          ? { ...t, isCompleted: true, isPinned: false }
          : t
      );
      setTodos(newTodos);
      return;
    }
    case "REVERT_TODO": {
      const newTodos = todos.map((t) =>
        t.id === action.toRevert.id ? { ...t, isCompleted: false } : t
      );
      setTodos(newTodos);
      return;
    }
    case "PIN_TODO": {
      const newTodos = todos.map((t) =>
        t.id === action.toPin.id ? { ...t, isPinned: true } : t
      );
      setTodos(newTodos);
      return;
    }
    case "UNPIN_TODO": {
      const newTodos = todos.map((t) =>
        t.id === action.toUnpin.id ? { ...t, isPinned: false } : t
      );
      setTodos(newTodos);
      return;
    }
    case "SET_SORT_ORDER": {
      if (sortOrder === action.newOrder) {
        setSortOrder("default");
        return;
      }
      setSortOrder(action.newOrder);
      return;
    }
    // don't want different colors on the same tag
    case "ADD_TAG": {
      const tagNames = allTagNames(todos);
      if (tagNames.includes(action.tagName)) {
        const newTag: Tag = {
          name: action.tagName,
          color: Math.floor(Math.random() * 24),
        };
        setTags([...tags, newTag]);
      }
      return;
    }
    // TODO: write a helper function that checks if it is the LAST occurrence of the tag.
    // then we should delete it.
    case "DELETE_TAG": {
      const tagNames = allTagNames(todos);
      if (tagNames.includes(action.toDelete.name)) {
        const newTags = tags.filter((tag) => tag.name !== action.toDelete.name);
        setTags(newTags);
      }
      return;
    }
    default: {
      return;
    }
  }
}
