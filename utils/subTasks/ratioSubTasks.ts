import { Todo } from "../types";

export default function ratioSubTasks(t: Todo) {
  if (t.subTasks.length === 0) return "no subtasks";

  const numComplete = t.subTasks.reduce((r, st) => {
    return st.isCompleted ? r + 1 : r;
  }, 0);

  return `${numComplete}/${t.subTasks.length} Completed`;
}
