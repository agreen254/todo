import { faker as f } from "@faker-js/faker";
import { DateTime } from "luxon";
import { Todo } from "./types";

// use in development to generate example todos
export default function dummyTodo(): Todo {
  return {
    name: f.lorem.words({ min: 1, max: 8 }),
    description: f.lorem.words({ min: 3, max: 25 }),
    createdAt: DateTime.now().toISO(),
    dueAt: f.date
      .between({
        from: DateTime.now().toISO(),
        to: DateTime.now().plus({ days: 30 }).toISO(),
      })
      .toISOString(),
    priority: f.number.int({ min: 1, max: 10 }),
    complexity: f.number.int({ min: 1, max: 10 }),
    isCompleted: false,
    isPinned: false,
    id: f.string.uuid(),
    repeatId: f.string.uuid(),
    tags: ["home", "chores"],
  };
}
