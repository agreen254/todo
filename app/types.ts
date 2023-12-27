import { DateTime } from "luxon";

export type Todo = {
  name: string;
  created_at: DateTime;
  due_at: DateTime;
  completed: boolean;
  id: string;
  tags: string[];
  //   notes: string;
  //   dueAt: Date;
};
