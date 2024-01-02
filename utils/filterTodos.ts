import { Todo, FilteredTodos } from "./types";

export default function filterTodos(todos: Todo[]): FilteredTodos {
  let result: FilteredTodos = {
    pinned: [],
    pending: [],
    completed: [],
  };

  for (let i = 0; i < todos.length; i++) {
    const current = todos[i];

    if (current.isPinned) {
      result.pinned.push(current);
    } else if (current.isCompleted) {
      result.completed.push(current);
    } else {
      result.pending.push(current);
    }
  }

  return result;
}
