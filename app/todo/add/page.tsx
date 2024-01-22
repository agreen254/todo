import dynamic from "next/dynamic";
import type { Metadata } from "next";
import AddForm from "@/components/Forms/AddForm";
const DynamicTags = dynamic(() => import("@/components/Forms/AddTags"), {ssr: false})

export const metadata: Metadata = {
  title: "Add a Todo",
};

const AddTodoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AddForm />
      <DynamicTags />
    </div>
  );
};

export default AddTodoPage;
