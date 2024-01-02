import { sort } from "fast-sort";
import { FilteredTodos, Quote, Tag, Todo, TodoSortOrder } from "./types";
import { quotes } from "./quotes";

export function textOutOfTen(priority: number): string {
  if (priority <= 3) {
    return `Low (${priority}/10)`;
  } else if (priority <= 7) {
    return `Medium (${priority}/10)`;
  } else {
    return `High (${priority}/10)`;
  }
}

export function randArrayEle<T>(arr: T[]): T {
  const randIdx = Math.floor(Math.random() * arr.length);
  return arr[randIdx];
}

export function randQuote(): Quote {
  return randArrayEle(quotes);
}

export function tagNameCount(todos: Todo[], name: string) {}

export function allTagNames(todos: Todo[]) {
  function todoTags(todo: Todo) {
    const tags = todo.tags;
    if (!tags) {
      return [];
    } else {
      return tags.reduce((names: string[], tag) => {
        return [...names, tag.name];
      }, []);
    }
  }

  return todos.reduce((names: string[], t) => {
    return [...names, ...todoTags(t)];
  }, []);
}

export function filterTodos(todos: Todo[]): FilteredTodos {
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

export function sortTodos(toSort: Todo[], sortOrder: TodoSortOrder): Todo[] {
  switch (sortOrder) {
    case "name_asc":
      return sort(toSort).by([
        { asc: (t) => t.name },
        // will fall back to this when needed to have a unique sorting point
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "name_desc":
      return sort(toSort).by([
        { desc: (t) => t.name },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "createdAt_asc":
      return sort(toSort).asc([(t) => t.createdAt]);
    case "createdAt_desc":
      return sort(toSort).desc([(t) => t.createdAt]);
    case "dueAt_asc":
      return sort(toSort).by([
        { asc: (t) => t.dueAt?.toUnixInteger },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "dueAt_desc":
      return sort(toSort).by([
        { desc: (t) => t.dueAt?.toUnixInteger },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "priority_asc":
      return sort(toSort).by([
        { asc: (t) => t.priority },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "priority_desc":
      return sort(toSort).by([
        { desc: (t) => t.priority },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "complexity_asc":
      return sort(toSort).by([
        { asc: (t) => t.complexity },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    case "complexity_desc":
      return sort(toSort).by([
        { desc: (t) => t.complexity },
        { desc: (t) => t.createdAt.toUnixInteger },
      ]);
    default:
      return sort(toSort).asc([(t) => t.createdAt.toUnixInteger]);
  }
}
