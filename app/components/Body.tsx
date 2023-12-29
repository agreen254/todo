"use client";

import { useContext, useState } from "react";
import { DateTime } from "luxon";
import { Separator } from "./ui/separator";
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
import TodoContext from "../context/TodoContext";

const Body = () => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const { todos, setTodos, reducer } = useContext(TodoContext);
  const completedTodos = getCompletedTodos(todos);
  const pendingTodos = getPendingTodos(todos);
  const pinnedTodos = getPinnedTodos(todos);

  const dummyTodo: Todo = {
    name: "this is a test to see how a really long title will look when it wraps around",
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
    // addTodo(dummyTodo);
    reducer(todos, setTodos, { action: "ADDTODO", toAdd: dummyTodo });
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
      <TodoMenu t={editingTodo} todos={todos} isEditing={false} />
      <h2 className="text-3xl ml-10">
        {pendingTodos.length || pinnedTodos.length
          ? "Pending Todos:"
          : "No pending todos to show."}
      </h2>
      <Separator className="w-[90vw] my-4 h-1 rounded-tr-md rounded-br-md" />
      <div className="flex justify-start flex-wrap max-w-[1920px] mx-auto">
        {pinnedTodos.map((t) => (
          <PinnedTodoCard
            key={t.id + "pinned"}
            t={t}
            todos={todos}
            className="min-w-[20vw] max-w-[30vw] mx-4 my-4"
          />
        ))}
        {pendingTodos.map((t) => (
          <TodoCard
            key={t.id + "pending"}
            t={t}
            todos={todos}
            className="min-w-[20vw] max-w-[30vw] mx-4 my-4"
          />
        ))}
      </div>
      <h2 className="ml-10 mt-12 text-3xl">
        {completedTodos.length
          ? "Completed Todos:"
          : "No completed todos to show."}
      </h2>
      <Separator className="w-[90vw] my-4 h-1 rounded-tr-md rounded-br-md" />
      <div className="flex justify-start flex-wrap max-w-[1920px] mx-auto">
        {completedTodos.map((t) => (
          <TodoCard
            key={t.id + "complete"}
            t={t}
            todos={todos}
            className="min-w-[20vw] max-w-[30vw] mx-4 my-4"
          />
        ))}
      </div>
      <RemoveAllDialog todos={todos} />
    </>
  );
};

export default Body;
