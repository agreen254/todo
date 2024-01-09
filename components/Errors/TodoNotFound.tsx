import Link from "next/link";
import { Button } from "../ui/button";

const TodoNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[10vh] h-[50vh]">
      <h1 className="text-4xl font-bold mb-6">
        The requested todo could not be found.
      </h1>
      <Link href="/">
        <Button className="text-2xl font-extrabold px-6 py-8">
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default TodoNotFound;