"use client";

import { TodoFormData } from "@/validation/schema";
import { todoFormDefaults } from "@/validation/schema";
import DatePicker from "./DatePicker";
import DateRangePicker from "./DateRangePicker";

const AddForm = () => {
  return <div>
    <h1>Add a Todo</h1>
    <DatePicker />
    <DateRangePicker />
  </div>;
};

export default AddForm;
