import { TodoSortOrder } from "./types";

// more readable sorting names to render in the UI
export const sortingMap = new Map<TodoSortOrder, string>([
  ["default", "default"],
  ["name_asc", "name (A to Z)"],
  ["name_desc", "name (Z to A)"],
  ["createdAt_asc", "oldest"],
  ["createdAt_desc", "youngest"],
  ["dueAt_asc", "most urgent"],
  ["dueAt_desc", "least urgent"],
  ["priority_asc", "high priority"],
  ["priority_desc", "low priority"],
  ["complexity_asc", "high complexity"],
  ["complexity_desc", "low complexity"],
]);
