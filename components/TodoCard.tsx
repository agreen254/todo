import { useContext } from "react";
import TodoContext from "@/contexts/TodoContext";
import { DateTime } from "luxon";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CheckCircle, Pin, PinOff } from "lucide-react";
import { Todo } from "@/utils/todoTypes";
import Link from "next/link";
import ContextMenu from "./ContextMenu";

export type Props = {
  t: Todo;
  className?: string;
};

const TodoCard = ({ t, className }: Props) => {
  const { dispatch } = useContext(TodoContext);

  // const timeRemaining = t.dueAt.diff(DateTime.now(), "days");
  // const handleDueColor = () => {
  //   if (timeRemaining.days > 5) {
  //     return "text-green-500";
  //   } else if (timeRemaining.days > 1) {
  //     return "text-orange-500";
  //   } else {
  //     return "text-red-500";
  //   }
  // };

  const handleCompleteButton = () => {
    if (t.isCompleted) {
      return (
        <Button
          onClick={() => dispatch({ actionName: "REVERT_TODO", toRevert: t })}
        >
          Revert
        </Button>
      );
    } else {
      return (
        <Button
          className="hover:text-green-400/90"
          onClick={() =>
            dispatch({ actionName: "COMPLETE_TODO", toComplete: t })
          }
        >
          Complete
        </Button>
      );
    }
  };

  const handlePinButton = () => {
    if (t.isCompleted) return;
    if (t.isPinned) {
      return (
        <Button
          onClick={() => dispatch({ actionName: "UNPIN_TODO", toUnpin: t })}
        >
          Unpin
        </Button>
      );
    } else {
      return (
        <Button onClick={() => dispatch({ actionName: "PIN_TODO", toPin: t })}>
          Pin
        </Button>
      );
    }
  };

  const handlePinIcon = () => {
    return t.isPinned ? (
      <PinOff className="w-6 h-6" />
    ) : (
      <Pin className="w-6 h-6" />
    );
  };

  return (
    <Card className={cn("relative", className)}>
      <CardHeader className="pt-0 px-0">
        <CardTitle
          className={cn(
            "flex justify-between items-center pt-5 mb-2 pb-[4px] px-5 rounded-t-md leading-8",
            t.isPinned && "bg-teal-500"
          )}
        >
          <p className="max-w-[calc(100%-30px)] line-clamp-2">{t.name}</p>
          <span className="flex justify-end">
            {handlePinIcon()}
            <CheckCircle
              className={cn(
                "w-6 h-6 ml-3 mr-2",
                t.isCompleted && "text-green-500"
              )}
            />
            <ContextMenu
              t={t}
              handleDelete={() =>
                dispatch({ actionName: "DELETE_TODO", toDelete: t })
              }
            />
          </span>
        </CardTitle>
        <CardDescription className="px-5 relative top-[-10px]">
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>due date goes here</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => dispatch({ actionName: "DELETE_TODO", toDelete: t })}
          className="hover:text-red-300/90"
        >
          Delete
        </Button>
        <Link href={`/todo/edit/${t.id}`}>
          <Button>Edit</Button>
        </Link>
        {handlePinButton()}
        {handleCompleteButton()}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
