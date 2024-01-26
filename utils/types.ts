// Store dates as an ISO string because any class information is erased when the data is stringified for local storage.
// Construct new class instances for date manipulation at runtime.
export type Todo = {
  name: string;
  createdAt: string;
  isCompleted: boolean;
  isPinned: boolean;
  id: string;
  repeats: boolean;
  repeatPeriod?: "daily" | "weekly" | "monthly";
  repeatId?: string;
  repeatEndDate?: string;
  priority: number;
  complexity: number;
  tags: string[];
  subTasks: SubTask[];
  completedAt?: string;
  description?: string;
  dueAt?: string;
};
export type SubTask = {
  subTaskName: string;
  isCompleted: boolean;
};

export type SplitTodos = {
  pinnedTodos: Todo[];
  pendingTodos: Todo[];
  completedTodos: Todo[];
};

// create as an array first so we can map over it in the SortMenu component
export const todoSortValues = [
  ["default"],
  ["powerMode"],
  ["name_asc", "name_desc"],
  ["dueAt_asc", "dueAt_desc"],
  ["priority_desc", "priority_asc"],
  ["complexity_desc", "complexity_asc"],
  ["createdAt_asc", "createdAt_desc"],
] as const;
// then flatten it so we can infer a string union type
// https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
const todoSortPossibilities = todoSortValues.flat();
export type TodoSortOrder = (typeof todoSortPossibilities)[number];

export const searchSpecifierValues = ["name", "dueAt", "description"] as const;
export type SearchSpecifier = (typeof searchSpecifierValues)[number];

// The Tag type here is different than the string array type assigned to the tags property of the Todo type.
// The Tag objects are what actually get assigned to the [tags, setTags] local storage (see the TodoProvider component);
// the name of the tag and integer to be pulled from the colorMap (see the TodoCardTagBadge component)
// are accessed by comparison of the tags property from the Todo object at runtime.
export type Tag = { name: string; color: number };

// The sort order is preserved in local storage for the home page only.
// Whenever a search occurs, the search page will have a separate sort order.
// Changes to the todo arrays themselves resulting from the search page will still persist, however.
export type TodoContextState = {
  todos: Todo[];
  sortOrder: TodoSortOrder;
  tags: {
    allTags: Tag[];
  };
};
export type TodoContextType = {
  state: TodoContextState;
  dispatch: (action: Actions) => void;
};

export type FilterTagsSchema = "exclusive" | "inclusive";

export type RepeatPeriod = "daily" | "weekly" | "monthly";

// Here are all the action types that tell the reducer what is okay to do.
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

type CloneTodo = {
  cmd: "CLONE_TODO";
  toClone: Todo;
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

type SetFilterTags = {
  cmd: "SET_FILTER_TAGS";
  tags: string[];
};

export type Actions =
  | AddTodo
  | DeleteTodo
  | DeleteAllTodos
  | EditTodo
  | CompleteTodo
  | CloneTodo
  | RevertTodo
  | PinTodo
  | UnpinTodo
  | SetSortOrder
  | SetFilterTags;
