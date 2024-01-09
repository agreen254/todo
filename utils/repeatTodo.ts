import { DateTime } from "luxon";
import { Todo } from "./types";
import { uid } from "uid";

// TODO: determine luxon behavior for the following scenarios:
// I declare a todo that is due on the 31st day of the month to repeat monthly. What happens for months that do not have a 31st day?
export default function repeatTodo(
  toClone: Todo,
  delay: "days" | "weeks" | "months",
  endDate: DateTime
): Todo[] {
  if (!toClone.dueAt) return [];

  const due = DateTime.fromISO(toClone.dueAt);
  const diff = endDate.diff(due, delay);

  let newTodos = [];
  if (delay === "days") {
    const numRepeats = diff.days;
    for (let i = 1; i <= numRepeats; i++) {
      newTodos.push({
        ...toClone,
        createdAt: DateTime.now().toISO(),
        id: uid(),
        dueAt: due.plus({ days: i }).toISO()!,
      } as Todo);
    }
  } else if (delay === "weeks") {
    const numRepeats = diff.weeks;
    for (let i = 1; i <= numRepeats; i++) {
      newTodos.push({
        ...toClone,
        createdAt: DateTime.now().toISO(),
        id: uid(),
        dueAt: due.plus({ weeks: i }).toISO()!,
      } as Todo);
    }
  } else {
    const numRepeats = diff.months;
    for (let i = 1; i <= numRepeats; i++) {
      newTodos.push({
        ...toClone,
        createdAt: DateTime.now().toISO(),
        id: uid(),
        dueAt: due.plus({ months: i }).toISO()!,
      } as Todo);
    }
  }

  return newTodos;
}
