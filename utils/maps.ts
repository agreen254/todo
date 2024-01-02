import { TodoSortOrder } from "./types";

// more readable sorting names to render in the UI
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