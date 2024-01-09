import AddForm from "@/components/Forms/AddForm";
import { TimePickerForm } from "@/components/ui/time-picker/time-picker-wrapper";
import { DateTimePicker } from "@/components/ui/time-picker/date-time-picker-demo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a Todo",
};

const AddTodoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AddForm />
      <DateTimePicker />
    </div>
  );
};

export default AddTodoPage;
