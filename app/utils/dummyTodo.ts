import { v4 as uuid } from "uuid";
import { Todo } from "../schema";

export const dummyTodo = {
  name: "hi",
  completed: false,
  id: uuid(),
} as Todo;
