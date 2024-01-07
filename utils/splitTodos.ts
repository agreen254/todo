import { Todo, SplitTodos } from "./types";

export default function splitTodos(todos: Todo[]): SplitTodos {
  let result: SplitTodos = {
    pinnedTodos: [],
    pendingTodos: [],
    completedTodos: [],
  };

  for (let i = 0; i < todos.length; i++) {
    const current = todos[i];

    if (current.isPinned) {
      result.pinnedTodos.push(current);
    } else if (current.isCompleted) {
      result.completedTodos.push(current);
    } else {
      result.pendingTodos.push(current);
    }
  }

  return result;
}
