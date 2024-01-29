import { Todo } from "../types";
import repeatDates from "../repeatDates";
import { uid } from "uid";

export default function repeatTodos(
  t: Todo,
  repeatEndDate: string,
  repeatPeriod: "daily" | "weekly" | "monthly"
) {
  if (!t.dueAt) return [];
  const dates = repeatDates(t.dueAt, repeatEndDate, repeatPeriod);
  return dates.map((d) => {
    const newTodo = Object.assign({}, t);
    newTodo.id = uid();
    newTodo.createdAt = t.createdAt;
    newTodo.dueAt = d.toISOString();
    return newTodo;
  });
}
