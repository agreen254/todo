import { Todo } from "../types";
import repeatDates from "../repeatDates";
import { uid } from "uid";

export default function repeatTodos(t: Todo) {
  if (!t.dueAt || !t.repeats || !t.repeatEndDate || !t.repeatPeriod) return [];
  const dates = repeatDates(t.dueAt, t.repeatEndDate, t.repeatPeriod);
  return dates.map((d) => {
    const newTodo = Object.assign({}, t);
    newTodo.id = uid();
    newTodo.createdAt = t.createdAt;
    newTodo.dueAt = d.toISOString();
    return newTodo;
  });
}
