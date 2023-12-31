import { DateTime } from "luxon";

export type Todo = {
  name: string;
  createdAt: DateTime;
  isCompleted: boolean;
  isPinned: boolean;
  id: string;
  description?: string;
  dueAt?: DateTime;
  tags?: string[];
  priority?: number;
  complexity?: number;
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
  colorValue: string;
};

export type TodoContextType = {
  todoState: {
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
