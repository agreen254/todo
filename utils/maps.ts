import { TodoSortOrder } from "./types";

export const sortingMap = new Map<TodoSortOrder, string>([
  ["default", "default"],
  ["name_asc", "name (asc)"],
  ["name_desc", "name (desc)"],
  ["createdAt_asc", "created (asc)"],
  ["createdAt_desc", "created (desc)"],
  ["dueAt_asc", "due (asc)"],
  ["dueAt_desc", "due (desc)"],
  ["priority_asc", "priority (asc)"],
  ["priority_desc", "priority (desc)"],
  ["complexity_asc", "complexity (asc)"],
  ["complexity_desc", "complexity (desc)"],
]);

export const hexMap = new Map<number, string>([
  [0, "0"],
  [1, "1"],
  [2, "2"],
  [3, "3"],
  [4, "4"],
  [5, "5"],
  [6, "6"],
  [7, "7"],
  [8, "8"],
  [9, "9"],
  [10, "A"],
  [11, "B"],
  [12, "C"],
  [13, "D"],
  [14, "E"],
  [15, "F"],
])