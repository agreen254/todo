import { Todo } from "../types";

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

export function todoReducer(
  todos: Todo[],
  setTodos: (ts: Todo[]) => void,
  action: Actions
) {
  switch (action.actionName) {
    case "ADD_TODO": {
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
          ? { ...t, isCompleted: true, isPinned: false }
          : t
      );
      setTodos(newTodos);
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
    default: {
      return;
    }
  }
}
