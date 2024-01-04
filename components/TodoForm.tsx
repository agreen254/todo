import { Input } from "./ui/input";
import { Label } from "./ui/label";

const TodoForm = (role: "add" | "edit" | "clone") => {
  return (
    <div>
      <h1>{`${role} Todo`}</h1>
      <form>
        <Label htmlFor="todoName">Name:</Label>
        <Input id="todoName" placeholder="enter name here" />

        <Label htmlFor="priority">Priority:</Label>
        <Input id="priority" />
      </form>
    </div>
  );
};
