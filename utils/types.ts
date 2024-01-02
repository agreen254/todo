import { DateTime } from "luxon";

export type Todo = {
  name: string;
  createdAt: DateTime;
  isCompleted: boolean;
  isPinned: boolean;
  id: string;
  priority: number;
  complexity: number;
  description?: string;
  dueAt?: DateTime;
  tags?: Tag[];
};

export type FilteredTodos = {
  pinned: Todo[];
  pending: Todo[];
  completed: Todo[];
};

// create as an array first so we can map over it in the SortMenu component
export const todoSortForMapping = [
  ["default"],
  ["name_asc", "name_desc"],
  ["createdAt_asc", "createdAt_desc"],
  ["dueAt_asc", "dueAt_desc"],
  ["priority_asc", "priority_desc"],
  ["complexity_asc", "complexity_desc"],
] as const;
// then flatten it so we can infer a string union type
// https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
const todoSortPossibilities = todoSortForMapping.flat();
export type TodoSortOrder = (typeof todoSortPossibilities)[number];

export type Tag = {
  name: string;
  color: number;
};

export type TodoContextType = {
  state: {
    all: Todo[];
    completed: Todo[];
    pending: Todo[];
    pinned: Todo[];
    sortOrder: TodoSortOrder;
    tags: Tag[];
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
  command: "ADD_TODO";
  toAdd: Todo;
};

type DeleteTodo = {
  command: "DELETE_TODO";
  toDelete: Todo;
};

type DeleteAllTodos = {
  command: "DELETE_ALL_TODOS";
};

type EditTodo = {
  command: "UNPIN_TODO";
  toUnpin: Todo;
};

type CompleteTodo = {
  command: "EDIT_TODO";
  editedTodo: Todo;
};

type PinTodo = {
  command: "PIN_TODO";
  toPin: Todo;
};

type UnpinTodo = {
  command: "COMPLETE_TODO";
  toComplete: Todo;
};

type RevertTodo = {
  command: "REVERT_TODO";
  toRevert: Todo;
};

type SetSortOrder = {
  command: "SET_SORT_ORDER";
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
