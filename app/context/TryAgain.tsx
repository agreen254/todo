"use client";

import TodoContext from "./TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { todoReducer } from "../reducers/todoReducerTwo";
import { Todo } from "../types";

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const addTodo = (toAdd: Todo) => {
    const newTodos = [...todos, toAdd];
    setTodos(newTodos);
  };

  const deleteTodo = (toDelete: Todo) => {
    const newTodos = todos.filter((t) => t.id !== toDelete.id);
    setTodos(newTodos);
  };

  const editTodo = (editedTodo: Todo) => {
    const idx = todos.findIndex((t) => t.id === editedTodo.id);
    return todos.splice(idx, 1, editedTodo);
  };

  const completeTodo = (toComplete: Todo) => {
    const newTodos = todos.map((t) =>
      t.id === toComplete.id ? { ...t, isCompleted: true, isPinned: false } : t
    );
    return setTodos(newTodos);
  };

  const revertTodo = (toRevert: Todo) => {
    const newTodos = todos.map((t) =>
      t.id === toRevert.id ? { ...t, isCompleted: false } : t
    );
    setTodos(newTodos);
  };

  const pinTodos = (toPin: Todo) => {
    const newTodos = todos.map((t) =>
      t.id === toPin.id ? { ...t, isPinned: true } : t
    );
    setTodos(newTodos);
  };

  const unpinTodo = (toUnpin: Todo) => {
    const newTodos = todos.map((t) =>
      t.id === toUnpin.id ? { ...t, isPinned: false } : t
    );
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, reducer: todoReducer }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
