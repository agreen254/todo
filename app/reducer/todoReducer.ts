import { Todo } from "../types";

type AddTodo = {
  action: "ADDTODO";
  toAdd: Todo;
};

type DeleteTodo = {
  action: "DELETETODO";
  toDelete: Todo;
};

type EditTodo = {
  action: "UNPINTODO";
  toUnpin: Todo;
};

type CompleteTodo = {
  action: "EDITTODO";
  editedTodo: Todo;
};

type PinTodo = {
  action: "PINTODO";
  toPin: Todo;
};

type UnpinTodo = {
  action: "COMPLETETODO";
  toComplete: Todo;
};

type RevertTodo = {
  action: "REVERTTODO";
  toRevert: Todo;
};

type GetTodos = {
  action: "GETTODOS";
};

export type Actions =
  | AddTodo
  | DeleteTodo
  | EditTodo
  | CompleteTodo
  | RevertTodo
  | PinTodo
  | UnpinTodo
  | GetTodos;

export function todoReducer(todos: Todo[], action: Actions) {
  // const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  switch (action.action) {
    case "ADDTODO": {
      return [...todos, action.toAdd];
    }
    case "DELETETODO": {
      return todos.filter((t) => t.id !== action.toDelete.id);
    }
    case "EDITTODO": {
      const idx = todos.findIndex((t) => t.id === action.editedTodo.id);
      return todos.splice(idx, 1, action.editedTodo);
    }
    case "COMPLETETODO": {
      return todos.map((t) =>
        t.id === action.toComplete.id
          ? { ...t, isCompleted: true, isPinned: false }
          : t
      );
    }
    case "REVERTTODO": {
      return todos.map((t) =>
        t.id === action.toRevert.id ? { ...t, isCompleted: false } : t
      );
    }
    case "PINTODO": {
      return todos.map((t) =>
        t.id === action.toPin.id ? { ...t, isPinned: true } : t
      );
    }
    case "UNPINTODO": {
      return todos.map((t) =>
        t.id === action.toUnpin.id ? { ...t, isPinned: false } : t
      );
    }
    default:
      return todos;
  }
}
