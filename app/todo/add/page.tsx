import dynamic from "next/dynamic";
import type { Metadata } from "next";
import AddForm from "@/components/Forms/AddForm";

export const metadata: Metadata = {
  title: "Add a Todo",
};

const DynamicTags = dynamic(() => import("@/components/Forms/AddTags"), {ssr: false})
const AddTodoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AddForm />
    </div>
  );
};

export default AddTodoPage;
