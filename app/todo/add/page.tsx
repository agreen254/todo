import AddForm from "@/components/Forms/AddForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a Todo",
};

const AddTodoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AddForm />
    </div>
  );
};

export default AddTodoPage;
