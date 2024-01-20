"use client";

import { useState } from "react";
import z from "zod";
import { sub } from "date-fns";
import { TodoFormData as FormData } from "@/validation/schema";
import { todoFormSchema as formSchema } from "@/validation/schema";
import { todoFormDefaults as defaultValues } from "@/validation/schema";
import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/time-picker/date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const AddForm = () => {
  const [date, setDate] = useState<Date>();
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-[350px] mt-[10vh] space-y-4"
      >
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
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>priority:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                  className="flex flex-wrap space-x-4"
                >
                  {arr.map((ele) => (
                    <FormItem key={ele}>
                      <FormLabel className="absolute translate-x-2 translate-y-3">{ele}</FormLabel>
                      <FormControl>
                        <RadioGroupItem value={ele.toString()} className="h-6 w-6"/>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>due at:</FormLabel>
              <DateTimePicker date={date} setDate={setDate} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="hover:scale-105 transition-all">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddForm;
