import { faker as f } from "@faker-js/faker";
import { uid } from "uid";
import { DateTime } from "luxon";
import { Todo } from "./types";
import randArrayEle from "./randEle";

const potentialTags = [
  ["home"],
  ["chores"],
  ["work"],
  ["home", "chores"],
  ["work", "chores"],
  ["school"],
];

// use in development to generate example todos
export default function dummyTodo(): Todo {
  return {
    name: f.lorem.words({ min: 1, max: 8 }),
    description: f.lorem.words({ min: 0, max: 25 }),
    createdAt: DateTime.now().toISO(),
    dueAt: f.date
      .between({
        from: DateTime.now().toISO(),
        to: DateTime.now().plus({ days: 5 }).toISO(),
      })
      .toISOString(),
    priority: f.number.int({ min: 0, max: 10 }),
    complexity: f.number.int({ min: 0, max: 10 }),
    isCompleted: false,
    isPinned: false,
    id: uid(),
    repeatId: uid(),
    tags: randArrayEle(potentialTags),
  };
}
