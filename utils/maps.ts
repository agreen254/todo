import { TodoSortOrder } from "./types";

// renders more straightforward sorting names to the user
export const sortingMap = new Map<TodoSortOrder, string>([
  ["default", "default"],
  ["name_asc", "name (A to Z)"],
  ["name_desc", "name (Z to A)"],
  ["createdAt_asc", "oldest"],
  ["createdAt_desc", "youngest"],
  ["dueAt_asc", "most urgent"],
  ["dueAt_desc", "least urgent"],
  ["priority_asc", "low priority"],
  ["priority_desc", "high priority"],
  ["complexity_asc", "low complexity"],
  ["complexity_desc", "high complexity"],
]);

// same but for rendering in the search results page
export const searchByMap = new Map<string, string>([
  ["name", "names"],
  ["description", "descriptions"],
  ["dueAt", "due dates"],
]);