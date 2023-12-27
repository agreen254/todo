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

const TodoCard = ({ t }: { t: Todo }) => {
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
        <p>buttons to pin and complete</p>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
