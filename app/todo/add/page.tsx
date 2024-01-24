import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { ArrowBigLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add a Todo",
};

const DynamicForm = dynamic(() => import("@/components/Forms/TodoForm"), {
  ssr: false,
});
const AddTodoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full justify-evenly items-center mt-10 mx-8">
        <div />
        <Button
          className="rounded-full hover:scale-110 transition-all"
          variant="ghost"
          size="icon"
          role="link"
        >
          <Link href="/">
            <ArrowBigLeft className="w-8 h-8" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))"/>
          </Link>
        </Button>
        <h1 className="font-bold text-2xl text-muted-foreground">Add New Todo</h1>
        <div />
        <div />
      </div>
      <DynamicForm />
    </div>
  );
};

export default AddTodoPage;
