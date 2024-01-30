import { Todo } from "@/utils/types";
import { cn } from "@/utils/cn";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useTodo } from "@/providers/TodoProvider";

const TodoCardComplete = ({ t }: { t: Todo }) => {
  const { dispatch } = useTodo();

  const handleCompleteClick = () => {
    if (t.isCompleted) {
      dispatch({ cmd: "REVERT_TODO", toRevert: t });
    } else {
      dispatch({ cmd: "COMPLETE_TODO", toComplete: t });
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={() => handleCompleteClick()}>
      <CheckCircle
        className={cn("w-6 h-6 mx-2", t.isCompleted && "text-green-500")}
      />
      <span className="sr-only">
        {t.isCompleted
          ? "revert completion of this todo"
          : "complete this todo"}
      </span>
    </Button>
  );
};

export default TodoCardComplete;
