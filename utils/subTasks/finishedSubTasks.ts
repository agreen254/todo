import { Todo } from "../types";

export default function finishedSubTasks(t: Todo) {
  return t.subTasks.every((t) => t.isCompleted);
}
