"use client";

import { useEffect, useState } from "react";
import { useFetchTodos } from "../hooks/useFetchTodos";
import { addTodo, deleteTodo, clearTodos } from "../utils/localStoreHelpers";
import { dummyTodo } from "../utils/dummyTodo";
import { Todo } from "../schema";
import { v4 as uuid } from "uuid";

const Body = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Use a separate variable to instantly provide feedback to the user whenever
  // the local storage is changed. Need a different variable because adding the
  // todos array as a dependency in the hook will cause an infinite re-render.
  const [instantUpdateHandler, setInstantUpdateHandler] = useState(false);
  const forceUpdate = () => {
    setInstantUpdateHandler(!instantUpdateHandler);
  };

  useFetchTodos(setTodos, instantUpdateHandler);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>, newTodo: Todo) => {
    e.preventDefault();
    addTodo(newTodo, todos);
    forceUpdate();
  };

  const handleClear = () => {
    clearTodos();
    forceUpdate();
  };

  const handleDelete = (id: string) => {
    deleteTodo(id, todos);
    forceUpdate();
  };

  return (
    <>
      <form onSubmit={(e) => handleAdd(e, dummyTodo)}>
        <label className="hidden" htmlFor="add">
          Add a todo
        </label>
        <input placeholder="name" />
        <button type="submit">Add</button>
      </form>
      <div>
        {todos.length
          ? todos.map((t) => (
              <ul key={t.id} className="space-x-4">
                <li className="inline-block">{t.name}</li>
                <li className="inline-block">{t.id}</li>
                <li className="inline-block">
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
                </li>
              </ul>
            ))
          : "no todos to display."}
      </div>
      <button onClick={handleClear}>Delete All</button>
    </>
  );
};

export default Body;
