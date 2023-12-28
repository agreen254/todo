import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Todo } from "../types";

type Props = {
  t: Todo;
  todos: Todo[];
  setTodos: (t: Todo) => void;
  isEditing: boolean;
};

const TodoMenu = ({ t, todos, setTodos, isEditing }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isEditing) {
      console.log("edited form.");
    } else {
      console.log("submitted new todo.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle>Add a Todo</DialogTitle>
          <DialogDescription>Enter details</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Submit</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TodoMenu;
