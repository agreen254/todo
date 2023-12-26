import { Todo } from "../schema";

export const getTodos = (): Todo[] => {
  const fetched = localStorage.getItem("todos");
  return fetched ? (JSON.parse(fetched) as Todo[]) : [];
};

export const addTodo = (toAdd: Todo, currentTodos: Todo[]): void => {
  currentTodos.length
    ? localStorage.setItem("todos", JSON.stringify([...currentTodos, toAdd]))
    : localStorage.setItem("todos", JSON.stringify([toAdd]));
};

export const clearTodos = (): void => {
  localStorage.setItem("todos", "");
};

export const deleteTodo = (id: string, currentTodos: Todo[]): void => {
  const newTodos = currentTodos.filter((t) => t.id !== id);
  localStorage.setItem("todos", JSON.stringify(newTodos));
};
