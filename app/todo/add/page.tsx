import AddForm from "@/components/Forms/AddForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a Todo",
};

const AddTodoPage = () => {
  return <AddForm />;
};

export default AddTodoPage;
