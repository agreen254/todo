import { faker as f } from "@faker-js/faker";
import { uid } from "uid";
import { add, formatISO } from "date-fns";
import { SubTask, Todo } from "../types";
import randArrayEle from "../randEle";

const potentialTags = [
  ["home"],
  ["chores"],
  ["work"],
  ["home", "chores"],
  ["work", "chores"],
  ["school"],
];

const generateSubTasks = (): SubTask[] => {
  const len = f.number.int({ min: 0, max: 10 });
  let subTasks = [];
  for (let i = 0; i < len; i++) {
    subTasks.push({
      subTaskName: f.lorem.sentence(),
      isCompleted: f.datatype.boolean(),
    });
  }
  return subTasks;
};

// use in development to generate example todos
export default function dummyTodo(): Todo {
  return {
    name: f.lorem.words({ min: 1, max: 8 }),
    description: f.lorem.words({ min: 0, max: 25 }),
    createdAt: formatISO(Date.now()),
    dueAt: f.date
      .between({
        from: Date.now(),
        to: add(Date.now(), { days: 10 }),
      })
      .toISOString(),
    priority: f.number.int({ min: 0, max: 10 }),
    complexity: f.number.int({ min: 0, max: 10 }),
    isCompleted: false,
    isPinned: false,
    id: uid(),
    repeats: false,
    tags: randArrayEle(potentialTags),
    subTasks: generateSubTasks(),
  };
}
