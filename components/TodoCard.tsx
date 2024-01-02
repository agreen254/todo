import { useContext } from "react";
import Link from "next/link";
import TodoContext from "@/contexts/TodoContext";
import { DateTime } from "luxon";
import { textOutOfTen } from "@/utils/helpers";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import {
  ArrowUp,
  Calendar,
  CheckCircle,
  Move,
  Pin,
  PinOff,
} from "lucide-react";
import { Todo } from "@/utils/types";
import ContextMenu from "./ContextMenu";
import TagUnit from "./Tag";

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
          onClick={() => dispatch({ command: "REVERT_TODO", toRevert: t })}
        >
          Revert
        </Button>
      );
    } else {
      return (
        <Button
          className="hover:text-green-400/90"
          onClick={() => dispatch({ command: "COMPLETE_TODO", toComplete: t })}
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
        <Button onClick={() => dispatch({ command: "UNPIN_TODO", toUnpin: t })}>
          Unpin
        </Button>
      );
    } else {
      return (
        <Button onClick={() => dispatch({ command: "PIN_TODO", toPin: t })}>
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
    <Card className={cn(className)}>
      <div
        className={cn(
          "flex justify-between items-center pt-5 mb-2 pb-[4px] px-5 rounded-t-md leading-8",
          t.isPinned && "bg-teal-500"
        )}
      >
        <h3 className="max-w-[calc(100%-30px)] line-clamp-1 text-xl md:text-2xl">
          {t.name}
        </h3>
        <span className="flex justify-end">
          {handlePinIcon()}
          <CheckCircle
            className={cn(
              "w-6 h-6 ml-3 mr-2",
              t.isCompleted && "text-green-500"
            )}
          />
          <ContextMenu t={t} deleteHandler={dispatch} />
        </span>
      </div>
      <CardDescription className="px-5 relative top-[-10px] line-clamp-1">
        {t.description}
      </CardDescription>
      <CardContent className="space-y-2">
        <p>
          <span>
            <Calendar className="w-4 h-4 mr-2 inline-block translate-y-[-2px]" />
            <span className="text-muted-foreground">Due Date:</span>
          </span>
        </p>
        <p>
          <span>
            <ArrowUp className="w-4 h-4 mr-2 inline-block" />
            <span className="text-muted-foreground">Priority: </span>
            <span className="font-semibold">{textOutOfTen(t.priority)}</span>
          </span>
        </p>
        <p>
          <span>
            <Move className="w-4 h-4 mr-2 inline-block" />
            <span className="text-muted-foreground">Complexity: </span>
            <span className="font-semibold">{textOutOfTen(t.complexity)}</span>
          </span>
        </p>
      </CardContent>
      <CardFooter>
        {t.tags?.map((tag) => (
          <TagUnit key={t.id + tag.name} tag={tag} />
        ))}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
