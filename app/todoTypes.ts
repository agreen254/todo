import { DateTime } from "luxon";

export type Todo = {
  name: string;
  description: string;
  createdAt: DateTime;
  dueAt: DateTime;
  isCompleted: boolean;
  isPinned: boolean;
  id: string;
  tags: string[];
};

export type Quote = {
  q: string;
  a: string;
};

export type TodoContextType = {
  todos: {
    completed: Todo[];
    pending: Todo[];
    pinned: Todo[];
  };
  dispatch: (action: Actions) => void;
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

export type Actions =
  | AddTodo
  | DeleteTodo
  | DeleteAllTodos
  | EditTodo
  | CompleteTodo
  | RevertTodo
  | PinTodo
  | UnpinTodo;
