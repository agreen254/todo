import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import { Todo } from "@/utils/types";
import { cn } from "@/utils/cn";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

const TodoCardComplete = ({ t }: { t: Todo }) => {
  const { dispatch } = useContext(TodoContext);

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
    </Button>
  );
};

export default TodoCardComplete;
