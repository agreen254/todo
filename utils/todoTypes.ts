import { DateTime } from "luxon";

export type Todo = {
  name: string;
  description?: string;
  createdAt: DateTime;
  dueAt?: DateTime;
  isCompleted: boolean;
  isPinned: boolean;
  id: string;
  tags?: string[];
  priority?: number;
  complexity?: number;
};

// https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
export const todoSortPossibilities = [
  "default",
  "name_asc",
  "name_desc",
  "createdAt_asc",
  "createdAt_desc",
  "dueAt_asc",
  "dueAt_desc",
  "priority_asc",
  "priority_desc",
  "complexity_asc",
  "complexity_desc",
] as const;
export type TodoSortOrder = (typeof todoSortPossibilities)[number];

export type Tag = {
  name: string;
  colorValue: string;
};

export type TodoContextType = {
  todoState: {
    all: Todo[];
    completed: Todo[];
    pending: Todo[];
    pinned: Todo[];
  };
  dispatch: (action: Actions) => void;
};

export type Quote = {
  q: string;
  a: string;
};

///////////////////
// REDUCER TYPES //
///////////////////
type AddTodo = {
  actionName: "ADD_TODO";
  toAdd: Todo;
};

type DeleteTodo = {
  actionName: "DELETE_TODO";
  toDelete: Todo;
};

type DeleteAllTodos = {
  actionName: "DELETE_ALL_TODOS";
};

type EditTodo = {
  actionName: "UNPIN_TODO";
  toUnpin: Todo;
};

type CompleteTodo = {
  actionName: "EDIT_TODO";
  editedTodo: Todo;
};

type PinTodo = {
  actionName: "PIN_TODO";
  toPin: Todo;
};

type UnpinTodo = {
  actionName: "COMPLETE_TODO";
  toComplete: Todo;
};

type RevertTodo = {
  actionName: "REVERT_TODO";
  toRevert: Todo;
};

type SetSortOrder = {
  actionName: "SET_SORT_ORDER";
  newOrder: TodoSortOrder;
};

export type Actions =
  | AddTodo
  | DeleteTodo
  | DeleteAllTodos
  | EditTodo
  | CompleteTodo
  | RevertTodo
  | PinTodo
  | UnpinTodo
  | SetSortOrder;
