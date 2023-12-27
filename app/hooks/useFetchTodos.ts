import { useEffect } from "react";
import { Todo } from "../types";
import { getTodos } from "../utils/localStoreHelpers";

export const useFetchTodos = (
  setTodos: (todos: Todo[]) => void,
  updateHandler: boolean
) => {
  useEffect(() => {
    const fetchedTodos = getTodos();
    setTodos(fetchedTodos);
  }, [updateHandler]);
};
