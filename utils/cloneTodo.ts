import { DateTime } from "luxon";
import { Todo } from "./types";
import { uid } from "uid";

export default function cloneTodo(
  toClone: Todo,
  delay: "days" | "weeks" | "months",
  endDate: DateTime
): Todo[] {
  if (!toClone.dueAt) return [];

  const due = DateTime.fromISO(toClone.dueAt);
  const diff = endDate.diff(due, delay);

  if (delay === "days") {
    const numRepeats = diff.days;

    let newTodos = [];
    for (let i = 1; i <= numRepeats; i++) {
      newTodos.push({
        ...toClone,
        createdAt: DateTime.now().toISO(),
        id: uid(),
        dueAt: due.plus({ days: i }).toISO()!,
      } as Todo);
    }
    return newTodos;
  } else if (delay === "weeks") {
    const numRepeats = diff.weeks;

    let newTodos = [];
    for (let i = 1; i <= numRepeats; i++) {
      newTodos.push({
        ...toClone,
        createdAt: DateTime.now().toISO(),
        id: uid(),
        dueAt: due.plus({ weeks: i }).toISO()!,
      } as Todo);
    }
    return newTodos;
  } else {
    const numRepeats = diff.months;

    let newTodos = [];
    for (let i = 1; i <= numRepeats; i++) {
      newTodos.push({
        ...toClone,
        createdAt: DateTime.now().toISO(),
        id: uid(),
        dueAt: due.plus({ months: i }).toISO()!,
      } as Todo);
    }
    return newTodos;
  }
}
