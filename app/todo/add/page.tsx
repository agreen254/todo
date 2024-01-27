import dynamic from "next/dynamic";
import { todoFormDefaults } from "@/validation/schema";
import type { Metadata } from "next";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const DynamicTodoForm = dynamic(() => import("@/components/Forms/TodoForm"), {
  ssr: false,
});
export const metadata: Metadata = {
  title: "Add a Todo",
};

const AddTodoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-[calc(100vw-4rem)] justify-evenly items-center mt-10 mx-8">
        <div />
        <Link href="/" tabIndex={-1}>
          <Button
            className="hover:scale-110 transition-all w-[50px] h-[50px]"
            variant="outline"
            size="icon"
            role="link"
          >
            <ArrowLeftIcon
              className="w-6 h-6"
              stroke="hsl(var(--secondary-foreground))"
            />
          </Button>
        </Link>
        <h1 className="font-bold text-2xl text-muted-foreground">
          Add New To-Do
        </h1>
        <div>
          <ThemeToggle />
        </div>
        <div />
      </div>
      <DynamicTodoForm defaultValues={todoFormDefaults} />
    </div>
  );
};

export default AddTodoPage;
