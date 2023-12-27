"use client";

import { useState } from "react";
import { useFetchTodos } from "../hooks/useFetchTodos";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  clearTodos,
} from "../utils/localStoreHelpers";
import { DateTime } from "luxon";
import { Todo } from "../types";
import { v4 as uuid } from "uuid";

const Body = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Use a separate variable to instantly provide feedback to the user whenever
  // the local storage is changed. Need a different variable because adding the
  // todos array as a dependency in the hook will cause an infinite re-render.
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const update = () => {
    setUpdateTrigger(!updateTrigger);
  };

  useFetchTodos(setTodos, updateTrigger);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>, newTodo: Todo) => {
    e.preventDefault();
    addTodo(newTodo, todos);
    update();
  };

  const handleClear = () => {
    clearTodos();
    update();
  };

  const handleComplete = (id: string) => {
    completeTodo(id, todos);
    update();
  };

  const handleDelete = (id: string) => {
    deleteTodo(id, todos);
    update();
  };

  const handlePin = (id: string) => {
    return;
  };

  const dummyTodo: Todo = {
    name: "hi",
    created_at: DateTime.now(),
    due_at: DateTime.now().plus({ days: 7 }),
    isCompleted: false,
    isPinned: false,
    id: uuid(),
    tags: ["home", "chores"],
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
                <li className="inline-block">
                  <button onClick={() => handleComplete(t.id)}>Complete</button>
                </li>
                <li className="inline-block">
                  <button onClick={() => handlePin(t.id)}>Pin</button>
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
