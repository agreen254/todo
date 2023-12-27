import { DateTime } from "luxon";

export type Todo = {
  name: string;
  description: string;
  createdAt: DateTime;
  dueAt: DateTime;
  isCompleted: boolean;
  isPinned: boolean;
  id: string;
  tags: string[];
};

export type Quote = {
  q: string;
  a: string;
};
