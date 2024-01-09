import cloneTodo from "@/utils/cloneTodo";
import tagsHandler from "@/utils/tagsHandler";
import { formatISO } from "date-fns";
import { Actions, Tag, Todo, TodoSortOrder } from "../utils/types";

// handles all operations on the global state
export function todoReducer(
  todos: Todo[],
  setTodos: (ts: Todo[]) => void,
  sortOrder: TodoSortOrder,
  setSortOrder: (order: TodoSortOrder) => void,
  tags: Tag[],
  setTags: (tags: Tag[]) => void,
  action: Actions
) {
  switch (action.cmd) {
    case "ADD_TODO": {
      tagsHandler(tags, action.toAdd.tags, setTags);
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
          ? {
              ...t,
              isCompleted: true,
              isPinned: false,
              completedAt: formatISO(Date()),
            }
          : t
      );
      setTodos(newTodos);
      return;
    }
    case "CLONE_TODO": {
      const clone = cloneTodo(action.toClone);
      setTodos([...todos, clone]);
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
    default: {
      return;
    }
  }
}
