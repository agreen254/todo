"use client";

import { useState } from "react";
import {
  addTodo,
  clearTodos,
  completeTodo,
  deleteTodo,
  pinTodo,
} from "../utils/localStoreHelpers";
import { DateTime } from "luxon";
import { Todo } from "../types";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const Body = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>, newTodo: Todo) => {
    e.preventDefault();
    addTodo(newTodo, todos);
  };

  const handleClear = () => {
    clearTodos();
  };

  const handleComplete = (id: string) => {
    completeTodo(id, todos);
  };

  const handleDelete = (id: string) => {
    deleteTodo(id, todos);
  };

  const handlePin = (id: string) => {
    pinTodo(id, todos);
  };

  const dummyTodo: Todo = {
    name: "sample text",
    createdAt: DateTime.now(),
    dueAt: DateTime.now().plus({ days: 7 }),
    isCompleted: false,
    isPinned: false,
    id: uuid(),
    tags: ["home", "chores"],
  };

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos, dummyTodo]);
  };

  return (
    <>
      {/* <form onSubmit={(e) => handleAdd(e, dummyTodo)}> */}
      <form onSubmit={add}>
        <label className="hidden" htmlFor="add">
          Add a todo
        </label>
        <input placeholder="name" />
        <button type="submit">Add</button>
      </form>
      <div>
        {todos.length
          ? todos.map((t: Todo) => (
              <ul key={t.id} className="space-x-4">
                <li className="inline-block">{t.name}</li>
                <li className="inline-block">{t.id}</li>
                <li className="inline-block">
                  {/* <button onClick={() => handleDelete(t.id)}>Delete</button> */}
                  <button
                    onClick={() =>
                      setTodos(todos.filter((todo) => todo.id !== t.id))
                    }
                  >
                    Delete
                  </button>
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
