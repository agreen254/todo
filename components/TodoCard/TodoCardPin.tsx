import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import { Pin, PinOff } from "lucide-react";
import { Button } from "../ui/button";
import { Todo } from "@/utils/types";

const TodoCardPin = ({ t }: { t: Todo }) => {
  const {
    state: { pinned },
    dispatch,
  } = useContext(TodoContext);

  return t.isPinned ? (
    <Button
      variant="ghost"
      size="icon"
      disabled={t.isCompleted}
      onClick={() => dispatch({ cmd: "UNPIN_TODO", toUnpin: t })}
    >
      <PinOff className="w-6 h-6 mx-2" />
    </Button>
  ) : (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch({ cmd: "PIN_TODO", toPin: t })}
      disabled={pinned.length >= 3 || t.isCompleted}
    >
      <Pin className="w-6 h-6 mx-2" />
    </Button>
  );
};

export default TodoCardPin;
