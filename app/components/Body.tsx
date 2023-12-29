"use client";

import { useContext } from "react";
import { DateTime } from "luxon";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import TodoCard from "./TodoCard";
import { Todo } from "../../utils/todoTypes";
import { v4 as uuid } from "uuid";
import PinnedTodoCard from "./PinnedTodoCard";
import RemoveAllDialog from "./RemoveAllDialog";
import TodoContext from "../../contexts/TodoContext";

const Body = () => {
  const {
    todos: { completed, pending, pinned },
    dispatch,
  } = useContext(TodoContext);

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

  return (
    <>
      <Button
        onClick={() => dispatch({ actionName: "ADD_TODO", toAdd: dummyTodo })}
      >
        Add Dummy
      </Button>
      <h2 className="text-3xl ml-10">
        {pending.length || pinned.length
          ? "Pending Todos:"
          : "No pending todos to show."}
      </h2>
      <Separator className="w-[65vw] my-2 h-[3px] rounded-tr-md rounded-br-md" />
      <div className="flex justify-start flex-wrap max-w-[1920px] mx-auto">
        {pinned.map((t) => (
          <PinnedTodoCard
            key={t.id + "pinned"}
            t={t}
            className="min-w-[20vw] max-w-[30vw] mx-4 my-4"
          />
        ))}
        {pending.map((t) => (
          <TodoCard
            key={t.id + "pending"}
            t={t}
            className="min-w-[20vw] max-w-[30vw] mx-4 my-4"
          />
        ))}
      </div>
      <h2 className="ml-10 mt-12 text-3xl">
        {completed.length ? "Completed Todos:" : "No completed todos to show."}
      </h2>
      <Separator className="w-[65vw] my-2 h-[3px] rounded-tr-md rounded-br-md" />
      <div className="flex justify-start flex-wrap max-w-[1920px] mx-auto">
        {completed.map((t) => (
          <TodoCard
            key={t.id + "complete"}
            t={t}
            className="min-w-[20vw] max-w-[30vw] mx-4 my-4"
          />
        ))}
      </div>
      <RemoveAllDialog />
    </>
  );
};

export default Body;
