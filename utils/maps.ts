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

// Colors for the tags
// You cannot render classNames in tailwind by directly using props that you pass
// to a component, you must map the props to a static className.
// more info: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
export const colorsMap = new Map<number, string>([
  [0, "bg-red-500/50"],
  [1, "bg-red-700/50"],
  [2, "bg-red-900/50"],
  [3, "bg-orange-500/50"],
  [4, "bg-orange-700/50"],
  [5, "bg-orange-900/50"],
  [6, "bg-yellow-500/50"],
  [7, "bg-yellow-700/50"],
  [8, "bg-yellow-900/50"],
  [9, "bg-teal-500/50"],
  [10, "bg-teal-700/50"],
  [11, "bg-teal-900/50"],
  [12, "bg-green-500/50"],
  [13, "bg-green-700/50"],
  [14, "bg-green-900/50"],
  [15, "bg-sky-500/50"],
  [16, "bg-sky-700/50"],
  [17, "bg-sky-900/50"],
  [18, "bg-blue-500/50"],
  [19, "bg-blue-700/50"],
  [20, "bg-blue-900/50"],
  [21, "bg-purple-500/50"],
  [22, "bg-purple-700/50"],
  [23, "bg-purple-900/50"],
]);
