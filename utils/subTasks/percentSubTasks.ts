import { Todo } from "../types";

export default function percentSubTasks(t: Todo) {
  if (t.subTasks.length === 0) return 0;

  const numComplete = t.subTasks.reduce((completed, st) => {
    return st.isCompleted ? completed + 1 : completed;
  }, 0);
  return Math.floor((100 * numComplete) / t.subTasks.length);
}
