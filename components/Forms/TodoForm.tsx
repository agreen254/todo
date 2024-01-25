"use client";

import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import { add, format, sub } from "date-fns";
import { uid } from "uid";
import { Calendar as CalendarIcon } from "lucide-react";
import { TodoFormData as FormData } from "@/validation/schema";
import { todoFormSchema as formSchema } from "@/validation/schema";
import { TimePicker12Demo } from "../ui/time-picker/time-picker-12hour";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import InputTags from "./InputTags";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { redirect } from "next/navigation";
import InputSubTasks from "./InputSubTasks";
import { SubTask } from "@/utils/types";
import { Checkbox } from "../ui/checkbox";

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
  defaultValues: Partial<FormData>;
};

const extractSubTasks = (
  subTaskNames: string[],
  completionArray: boolean[]
) => {
  if (subTaskNames.length !== completionArray.length) return [];

  let subTasks = [];
  for (let i = 0; i < subTaskNames.length; i++) {
    subTasks.push({
      subTaskName: subTaskNames[i],
      isCompleted: completionArray[i],
    });
  }
  return subTasks;
};

const TodoForm = ({ defaultValues }: Props) => {
  const [subTasks, setSubTasks] = useState<SubTask[]>(
    extractSubTasks(
      defaultValues?.subTasks || [],
      defaultValues?.completedSubTasks || []
    )
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const now = new Date();
    const transformedData = {
      name: data.name,
      description: data?.description,
      createdAt: defaultValues?.createdAt || now.toISOString(),
      dueAt: data?.dueAt,
      repeats: data.repeats,
      repeatPeriod: data.repeatPeriod,
      repeatEndDate: data?.repeatEndDate,
      priority: data.priority,
      complexity: data.complexity,
      tags: data.tags,
      subTasks: subTasks,
      id: defaultValues?.id || uid(),
      repeatId: defaultValues?.repeatId || uid(),
    };
    console.log(transformedData);
  };

  const yesterday = () => {
    return sub(Date(), { days: 1 });
  };
  const handleSelect = (
    d: Date | undefined,
    date: Date | undefined,
    setDate: (d: Date) => void
  ) => {
    if (!d) return;
    if (!date) {
      setDate(d);
      return;
    }
    const diff = d.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDate = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDate);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full max-w-[480px] mt-10 mb-[min(3rem,10vh)]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" type="text" {...field} />
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
              <FormLabel>Due:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PP p")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(d) =>
                      handleSelect(d, field.value, field.onChange)
                    }
                    disabled={(d) => d < yesterday()}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker12Demo
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <div className="flex justify-start items-end mt-1">
          <FormField
            control={form.control}
            name="repeats"
            render={({ field }) => (
              <FormItem
                className={cn(
                  "flex items-end space-x-2",
                  !field.value && "mb-8"
                )}
              >
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Repeats</FormLabel>
              </FormItem>
            )}
          />
          {form.getValues().repeats && (
            <FormField
              control={form.control}
              name="repeatPeriod"
              render={({ field }) => (
                <FormItem className="ml-6">
                  <FormLabel className="sr-only">Repeat period:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={"weekly"}
                      className="flex justify-start gap-x-4"
                    >
                      <FormItem className="flex items-end">
                        <FormControl>
                          <RadioGroupItem value="daily" className="mr-1" />
                        </FormControl>
                        <FormLabel>daily</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-end">
                        <FormControl>
                          <RadioGroupItem value="weekly" className="mr-1" />
                        </FormControl>
                        <FormLabel>weekly</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-end">
                        <FormControl>
                          <RadioGroupItem value="monthly" className="mr-1" />
                        </FormControl>
                        <FormLabel>monthly</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>
        {form.getValues().repeats && (
          <FormField
            control={form.control}
            name="repeatEndDate"
            render={({ field }) => (
              <FormItem className="mt-2 mb-6">
                <FormLabel className="sr-only">End date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal mt-4",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick date repeat ends</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Repeats will stop at the specified day or closest relevant day
                  before
                </FormDescription>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(n) => field.onChange(parseInt(n))}
                  defaultValue={defaultValues?.priority?.toString()}
                  className="flex flex-wrap justify-start md:justify-evenly -translate-y-2"
                >
                  {arr.map((ele) => (
                    <FormItem key={ele + "priority"}>
                      <FormLabel
                        className={cn(
                          "absolute translate-y-4 font-bold",
                          ele < 10 ? "translate-x-3" : "translate-x-2"
                        )}
                      >
                        {ele}
                      </FormLabel>
                      <FormControl>
                        <RadioGroupItem
                          value={ele.toString()}
                          className={cn(
                            "w-8 h-8 bg-secondary hover:bg-primary/50",
                            field.value === ele && "bg-primary hover:bg-primary"
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="complexity"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Complexity:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(n) => field.onChange(parseInt(n))}
                  defaultValue={defaultValues?.priority?.toString()}
                  className="flex flex-wrap justify-start md:justify-evenly -translate-y-2"
                >
                  {arr.map((ele) => (
                    <FormItem key={ele + "complexity"}>
                      <FormLabel
                        className={cn(
                          "absolute translate-y-4 font-bold",
                          ele < 10 ? "translate-x-3" : "translate-x-2"
                        )}
                      >
                        {ele}
                      </FormLabel>
                      <FormControl>
                        <RadioGroupItem
                          value={ele.toString()}
                          className={cn(
                            "w-8 h-8 bg-secondary hover:bg-primary/50",
                            field.value === ele && "bg-primary hover:bg-primary"
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="max-w-[640px] mt-1 mb-10">
              <FormLabel>Tags:</FormLabel>
              <FormControl>
                <InputTags {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subTasks"
          render={({ field }) => (
            <FormItem className="max-w-[640px]">
              <FormLabel>Subtasks:</FormLabel>
              <FormControl>
                <InputSubTasks
                  subTasks={subTasks}
                  setSubTasks={setSubTasks}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="hover:scale-105 transition-all mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;
