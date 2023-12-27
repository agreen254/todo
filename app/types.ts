import { DateTime } from "luxon";

export type Todo = {
  name: string;
  created_at: DateTime;
  due_at: DateTime;
  isCompleted: boolean;
  isPinned: boolean;
  id: string;
  tags: string[];
  //   notes: string;
  //   dueAt: Date;
};

export type Quote = {
  q: string;
  a: string;
};
