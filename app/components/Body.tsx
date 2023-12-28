"use client";

import { useState } from "react";
import { DateTime } from "luxon";
import TodoCard from "./TodoCard";
import { Todo } from "../types";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import TodoMenu from "./TodoMenu";
import {
  getCompletedTodos,
  getPendingTodos,
  getPinnedTodos,
} from "../utils/todoHelpers";
import PinnedTodoCard from "./PinnedTodoCard";
import RemoveAllDialog from "./RemoveAllDialog";

const Body = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const completedTodos = getCompletedTodos(todos);
  const pendingTodos = getPendingTodos(todos);
  const pinnedTodos = getPinnedTodos(todos);

  const dummyTodo: Todo = {
    name: "this is a really fucking long title I wonder how it will warp",
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
      <TodoMenu
        t={editingTodo}
        todos={todos}
        setTodos={setTodos}
        isEditing={false}
      />
      <h2 className="text-center mb-4">
        {pendingTodos.length || pinnedTodos.length
          ? "Pending Todos:"
          : "No pending todos to show."}
      </h2>
      <div className="flex justify-start gap-4 flex-wrap max-w-[1920px] mx-auto">
        {pinnedTodos.map((t) => (
          <PinnedTodoCard
            key={t.id + "pinned"}
            t={t}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
        {pendingTodos.map((t) => (
          <TodoCard
            key={t.id + "pending"}
            t={t}
            todos={todos}
            setTodos={setTodos}
            className="min-w-[20vw] max-w-[40vw]"
          />
        ))}
      </div>
      <h2 className="text-center mb-4">
        {completedTodos.length
          ? "Completed Todos:"
          : "No completed todos to show."}
      </h2>
      <div className="grid grid-cols-2 gap-4 place-items-center items-start max-w-[1920px] mx-auto">
        {completedTodos.map((t) => (
          <TodoCard
            key={t.id + "complete"}
            t={t}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      <RemoveAllDialog todos={todos} setTodos={setTodos} />
    </>
  );
};

export default Body;
