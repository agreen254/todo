"use client";

import { useState } from "react";
import { DateTime } from "luxon";
import { Button } from "./ui/button";
import TodoCard from "./TodoCard";
import { Todo } from "../types";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import getCompletedTodos from "../utils/getCompletedTodos";
import getPendingTodos from "../utils/getPendingTodos";

const Body = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const completedTodos = getCompletedTodos(todos);
  const pendingTodos = getPendingTodos(todos);

  const handleClear = () => {
    setTodos([]);
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
      <form onSubmit={handleAdd}>
        <label className="hidden" htmlFor="add">
          Add a todo
        </label>
        <input placeholder="name" id="add" />
        <button type="submit">Add</button>
      </form>
      <div className="grid grid-cols-2 gap-4 place-items-center items-start">
        <div className="min-w-[400px] max-w-[800px]">
          <ul className="w-full">
            <li>
              <h2 className="text-center mb-4">
                {pendingTodos.length ? "Pending" : "No pending todos to show."}
              </h2>
            </li>
            {todos.map(
              (t) =>
                !t.isCompleted && (
                  <li key={t.id + "card" + "pending"} className="mt-4">
                    <TodoCard t={t} todos={todos} setTodos={setTodos} />
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="min-w-[400px] max-w-[800px]">
          <ul className="w-full">
            <li>
              <h2 className="text-center mb-4">
                {completedTodos.length
                  ? "Completed"
                  : "No completed todos to show."}
              </h2>
            </li>
            {todos.map(
              (t) =>
                t.isCompleted && (
                  <li key={t.id + "card" + "complete"} className="mt-4">
                    <TodoCard t={t} todos={todos} setTodos={setTodos} />
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
      <Button onClick={handleClear} disabled={!todos.length}>
        Delete All
      </Button>
    </>
  );
};

export default Body;
