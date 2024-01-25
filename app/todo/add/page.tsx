import dynamic from "next/dynamic";
import TodoForm from "@/components/Forms/TodoForm";
import { todoFormDefaults } from "@/validation/schema";
import type { Metadata } from "next";
import { ArrowBigLeft as ArrowBigLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeButton from "@/components/HomeButton";

const DynamicTodoForm = dynamic(() => import("@/components/Forms/TodoForm"), {
  ssr: false,
});
export const metadata: Metadata = {
  title: "Add a Todo",
};

const AddTodoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full justify-evenly items-center mt-10 mx-8">
        <div />
        <Button
          className="rounded-full hover:scale-125 transition-all"
          variant="ghost"
          size="icon"
          role="link"
        >
          <Link href="/">
            <ArrowBigLeftIcon
              className="w-8 h-8"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted-foreground))"
            />
          </Link>
        </Button>
        <h1 className="font-bold text-2xl text-muted-foreground">
          Add New Todo
        </h1>
        <div />
        <div />
      </div>
      <DynamicTodoForm defaultValues={todoFormDefaults} />
    </div>
  );
};

export default AddTodoPage;
