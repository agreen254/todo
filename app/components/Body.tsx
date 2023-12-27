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
import Card from "./TodoCard";
import { Todo } from "../types";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const Body = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const handleClear = () => {
    setTodos([]);
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
    description: "a short description of the task",
    createdAt: DateTime.now(),
    dueAt: DateTime.now().plus({ days: 7 }),
    isCompleted: false,
    isPinned: false,
    id: uuid(),
    tags: ["home", "chores"],
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos, dummyTodo]);
  };

  return (
    <>
      {/* <form onSubmit={(e) => handleAdd(e, dummyTodo)}> */}
      <form onSubmit={handleAdd}>
        <label className="hidden" htmlFor="add">
          Add a todo
        </label>
        <input placeholder="name" id="add" />
        <button type="submit">Add</button>
      </form>
      <div>
        <ul>
          {todos.map((t) => (
            <li key={t.id + "card"}>
              <Card t={t} todos={todos} setTodos={setTodos} />
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleClear} disabled={!todos.length}>
        Delete All
      </button>
    </>
  );
};

export default Body;
