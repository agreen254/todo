import { Pin, PinOff } from "lucide-react";
import { Button } from "../ui/button";
import { Todo } from "@/utils/types";
import { useTodo } from "@/providers/TodoProvider";

const TodoCardPin = ({ t }: { t: Todo }) => {
  const {
    state: { todos },
    dispatch,
  } = useTodo();

  const shouldDisable = () =>
    todos.filter((t) => t.isCompleted).length >= 3 || t.isCompleted;

  return t.isPinned ? (
    <Button
      variant="ghost"
      size="icon"
      disabled={t.isCompleted}
      onClick={() => dispatch({ cmd: "UNPIN_TODO", toUnpin: t })}
    >
      <span className="sr-only">unpin this todo</span>
      <PinOff className="w-6 h-6 mx-2" />
    </Button>
  ) : (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch({ cmd: "PIN_TODO", toPin: t })}
      disabled={shouldDisable()}
    >
      <span className="sr-only">pin this todo</span>
      <Pin className="w-6 h-6 mx-2" />
    </Button>
  );
};

export default TodoCardPin;
