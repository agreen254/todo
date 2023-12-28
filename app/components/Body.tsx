"use client";

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
  const completedTodos = getCompletedTodos(todos);
  const pendingTodos = getPendingTodos(todos);
  const pinnedTodos = getPinnedTodos(todos);

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
      <TodoMenu />
      <div className="grid grid-cols-2 gap-4 place-items-center items-start">
        <div className="min-w-[320px] max-w-[calc(50vw-100px)]">
          <ul className="w-full">
            <li>
              <h2 className="text-center mb-4">
                {pendingTodos.length || pinnedTodos.length
                  ? "Pending Todos:"
                  : "No pending todos to show."}
              </h2>
            </li>
            {pinnedTodos.map((t) => (
              <li key={t.id + "card" + "pinned"}>
                <PinnedTodoCard t={t} todos={todos} setTodos={setTodos} />
              </li>
            ))}
            {pendingTodos.map((t) => (
              <li key={t.id + "card" + "pending"} className="mt-4">
                <TodoCard t={t} todos={todos} setTodos={setTodos} />
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-[400px] max-w-[800px]">
          <ul className="w-full">
            <li>
              <h2 className="text-center mb-4">
                {completedTodos.length
                  ? "Completed Todos:"
                  : "No completed todos to show."}
              </h2>
            </li>
            {completedTodos.map((t) => (
              <li key={t.id + "card" + "complete"} className="mt-4">
                <TodoCard t={t} todos={todos} setTodos={setTodos} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <RemoveAllDialog todos={todos} setTodos={setTodos} />
    </>
  );
};

export default Body;
