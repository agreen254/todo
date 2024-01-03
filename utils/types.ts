// Ideally the dueAt and createdAt properties would be instances of the DateTime class, but the class information
// gets erased when the data gets stringified to be stored in local storage.
// This throws errors because you will try to access DateTime methods that are no longer available.
// As a work around, the dates are stored as UTC strings and then converted to class instances when they are accessed at runtime.
export type Todo = {
  name: string;
  createdAt: string;
  isCompleted: boolean;
  isPinned: boolean;
  id: string;
  repeatId: string;
  priority: number;
  complexity: number;
  description?: string;
  dueAt?: string;
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

export type Tag = { name: string; color: number };

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
  cmd: "ADD_TODO";
  toAdd: Todo;
};

type DeleteTodo = {
  cmd: "DELETE_TODO";
  toDelete: Todo;
};

type DeleteAllTodos = {
  cmd: "DELETE_ALL_TODOS";
};

type EditTodo = {
  cmd: "UNPIN_TODO";
  toUnpin: Todo;
};

type CompleteTodo = {
  cmd: "EDIT_TODO";
  editedTodo: Todo;
};

type PinTodo = {
  cmd: "PIN_TODO";
  toPin: Todo;
};

type UnpinTodo = {
  cmd: "COMPLETE_TODO";
  toComplete: Todo;
};

type RevertTodo = {
  cmd: "REVERT_TODO";
  toRevert: Todo;
};

type SetSortOrder = {
  cmd: "SET_SORT_ORDER";
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
