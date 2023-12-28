import useLocalStorage from "../hooks/useLocalStorage";
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

export type Actions =
  | AddTodo
  | DeleteTodo
  | EditTodo
  | CompleteTodo
  | RevertTodo
  | PinTodo
  | UnpinTodo;

export function todoReducer(action: Actions) {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  switch (action.action) {
    case "ADDTODO": {
      const newState = [...todos, action.toAdd];
      setTodos(newState);
      return;
    }
    case "DELETETODO": {
      const newState = todos.filter((t) => t.id !== action.toDelete.id);
      setTodos(newState);
      return;
    }
    case "EDITTODO": {
      const idx = todos.findIndex((t) => t.id === action.editedTodo.id);
      const newTodos = todos.splice(idx, 1, action.editedTodo);
      setTodos(newTodos);
      return;
    }
    case "COMPLETETODO": {
      const newTodos = todos.map((t) =>
        t.id === action.toComplete.id
          ? { ...t, isCompleted: true, isPinned: false }
          : t
      );
      setTodos(newTodos);
      return;
    }
    case "REVERTTODO": {
      const newTodos = todos.map((t) =>
        t.id === action.toRevert.id ? { ...t, isCompleted: false } : t
      );
      setTodos(newTodos);
      return;
    }
    case "PINTODO": {
      const newTodos = todos.map((t) =>
        t.id === action.toPin.id ? { ...t, isPinned: true } : t
      );
      setTodos(newTodos);
      return;
    }
    case "UNPINTODO": {
      const newTodos = todos.map((t) =>
        t.id === action.toUnpin.id ? { ...t, isPinned: false } : t
      );
      setTodos(newTodos);
      return;
    }
    default:
      return todos;
  }
}
