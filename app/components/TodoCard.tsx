import { cn } from "../utils/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CheckCircle, MoreHorizontal } from "lucide-react";
import { Todo } from "../types";

export type Props = {
  t: Todo;
  todos: Todo[];
  setTodos: (ts: Todo[]) => void;
  className?: string;
};

const TodoCard = ({ t, todos, setTodos, className }: Props) => {
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

  const handleDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== t.id));
  };

  const handleComplete = () => {
    setTodos(
      todos.map((todo) => {
        return todo.id === t.id
          ? { ...todo, isCompleted: true, isPinned: false }
          : todo;
      })
    );
  };

  const handlePin = () => {
    setTodos(
      todos.map((todo) => {
        return todo.id === t.id ? { ...todo, isPinned: true } : todo;
      })
    );
  };

  const handleRevert = () => {
    setTodos(
      todos.map((todo) => {
        return todo.id === t.id ? { ...todo, isCompleted: false } : todo;
      })
    );
  };

  const handleUnpin = () => {
    setTodos(
      todos.map((todo) => {
        return todo.id === t.id ? { ...todo, isPinned: false } : todo;
      })
    );
  };

  const handleCompleteButton = (t: Todo) => {
    if (t.isCompleted) {
      return <Button onClick={handleRevert}>Revert</Button>;
    } else {
      return (
        <Button onClick={handleComplete} className="hover:text-green-400/90">
          Complete
        </Button>
      );
    }
  };

  const handlePinButton = (t: Todo) => {
    if (t.isCompleted) return;

    if (t.isPinned) {
      return <Button onClick={handleUnpin}>Unpin</Button>;
    } else {
      return <Button onClick={handlePin}>Pin</Button>;
    }
  };

  return (
    <Card className={cn("relative", className)}>
      <CardHeader>
        <div className="h-4">
          <CheckCircle className="w-4 h-4 inline-block absolute right-10 top-4" />
          <MoreHorizontal className="w-4 h-4 inline-block absolute right-4 top-4" />
        </div>
        <CardTitle>{t.name}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>due date goes here</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDelete} className="hover:text-red-300/90">
          Delete
        </Button>
        {handlePinButton(t)}
        {handleCompleteButton(t)}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
