import { Todo } from "../types";

export const getTodos = (): Todo[] => {
  const fetchedTodos = localStorage.getItem("todos");
  return fetchedTodos ? (JSON.parse(fetchedTodos) as Todo[]) : [];
};

export const addTodo = (toAdd: Todo, currentTodos: Todo[]): void => {
  currentTodos.length
    ? localStorage.setItem("todos", JSON.stringify([...currentTodos, toAdd]))
    : localStorage.setItem("todos", JSON.stringify([toAdd]));
};

export const clearTodos = (): void => {
  localStorage.setItem("todos", "");
};

export const completeTodo = (id: string, currentTodos: Todo[]) => {
  const idx = currentTodos.findIndex((t) => t.id === id);
  const newTodo: Todo = { ...currentTodos[idx], isCompleted: true };
  localStorage.setItem(
    "todos",
    JSON.stringify(currentTodos.map((t) => (t.id === id ? newTodo : t)))
  );
};

export const deleteTodo = (id: string, currentTodos: Todo[]): void => {
  const newTodos = currentTodos.filter((t) => t.id !== id);
  localStorage.setItem("todos", JSON.stringify(newTodos));
};

export const pinTodo = (id: string, currentTodos: Todo[]) => {
  const idx = currentTodos.findIndex((t) => t.id === id);
  const newTodo: Todo = { ...currentTodos[idx], isPinned: true };
  localStorage.setItem(
    "todos",
    JSON.stringify(currentTodos.map((t) => (t.id === id ? newTodo : t)))
  );
};
