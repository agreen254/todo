import { DateTime } from "luxon";
import { Todo } from "../types";
import { uid } from "uid";

export default function cloneTodo(toClone: Todo): Todo {
  return {
    ...toClone,
    id: uid(),
    repeatId: uid(),
    createdAt: DateTime.now().toISO(),
  };
}
