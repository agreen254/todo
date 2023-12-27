import { DateTime } from "luxon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Todo } from "../types";
import { Button } from "./ui/button";

type Props = {
  t: Todo;
  todos: Todo[];
  setTodos: (ts: Todo[]) => void;
};

const TodoCard = ({ t, todos, setTodos }: Props) => {
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
        return todo.id === t.id ? { ...todo, isCompleted: true } : todo;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.name}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>due date goes here</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handlePin}>Pin</Button>
        <Button onClick={handleComplete}>Complete</Button>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
