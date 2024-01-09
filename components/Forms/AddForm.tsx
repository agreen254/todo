"use client";

import z from "zod";
import { cn } from "@/utils/cn";
import { format, sub } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TodoFormData as FormData } from "@/validation/schema";
import { todoFormSchema as formSchema } from "@/validation/schema";
import { todoFormDefaults as defaultValues } from "@/validation/schema";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import DatePicker from "./DatePicker";
import DateRangePicker from "./DateRangePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AddForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  const yesterday = () => {
    return sub(Date(), { days: 1 });
  };
  // return <div>
  //   <h1>Add a Todo</h1>
  //   <DatePicker />
  //   <DateRangePicker />
  // </div>;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title:</FormLabel>
              <FormControl>
                <Input placeholder="enter title" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description:</FormLabel>
              <FormControl>
                <Input placeholder="enter description" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due At:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < yesterday()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddForm;
