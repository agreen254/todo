"use client";

import z from "zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { add, format, sub } from "date-fns";
import { uid } from "uid";
import { priorityAndComplexityValues as pcVals } from "@/utils/types";
import fetchTags from "@/utils/tags/fetchTags";
import repeatTodos from "@/utils/todos/repeatTodos";
import { Calendar as CalendarIcon } from "lucide-react";
import TodoContext from "@/contexts/TodoContext";
import { TodoFormData as FormData } from "@/validation/schema";
import { todoFormSchema as formSchema } from "@/validation/schema";
import { TimePickerTwelve } from "../ui/time-picker/time-picker-12hour";
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
import InputSubTasks from "./InputSubTasks";
import { SubTask, Tag, Todo } from "@/utils/types";
import { Checkbox } from "../ui/checkbox";

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
  const {
    state: {
      todos,
      tags: { allTags },
    },
    dispatch,
  } = useContext(TodoContext);
  const router = useRouter();
  const [subTasks, setSubTasks] = useState<SubTask[]>(
    extractSubTasks(
      defaultValues?.subTasks || [],
      defaultValues?.completedSubTasks || []
    )
  );
  const [activeTags, setActiveTags] = useState<Tag[]>(
    fetchTags(allTags, defaultValues.tags)
  );

  const isAdding = !!!defaultValues.id;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("wtf")
    const now = new Date();
    const transformedData: Todo = {
      name: data.name,
      description: data?.description,
      createdAt: defaultValues?.createdAt?.toISOString() || now.toISOString(),
      dueAt: data?.dueAt?.toISOString(),
      priority: data.priority,
      complexity: data.complexity,
      tags: data.tags,
      subTasks: subTasks,
      id: defaultValues.id || uid(),
      isCompleted: defaultValues.isCompleted || false,
      isPinned: defaultValues.isPinned || false,
    };
    if (data.repeats && data.repeatEndDate && data.repeatPeriod) {
      dispatch({
        cmd: "ADD_MULTIPLE_TODOS",
        toAdd: repeatTodos(
          transformedData,
          data.repeatEndDate.toISOString(),
          data.repeatPeriod
        ),
      });
    } else if (defaultValues.id) {
      dispatch({ cmd: "EDIT_TODO", editedTodo: transformedData });
    } else {
      dispatch({ cmd: "ADD_TODO", toAdd: transformedData });
    }
    router.push("/");
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
        className="mb-[min(3rem,10vh)] mt-10 flex w-[calc(100vw-2rem)] max-w-[480px] flex-col justify-center"
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
            <FormItem className={cn("flex flex-col", !isAdding && "mb-4")}>
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
                  <div className="border-border border-t p-3">
                    <TimePickerTwelve
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        {isAdding && (
          <FormField
            control={form.control}
            name="repeats"
            render={({ field }) => (
              <FormItem
                className={cn(
                  "mb-6 mt-1 flex items-end space-x-2",
                  form.getValues().repeats && "mb-0"
                )}
              >
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") field.onChange(!field.value);
                    }}
                  />
                </FormControl>
                <FormLabel>Repeats</FormLabel>
              </FormItem>
            )}
          />
        )}
        {form.getValues().repeats && !form.getValues().dueAt && (
          <p className="text-destructive mb-6 mt-2 text-sm">
            You must specify a due date first.
          </p>
        )}
        {form.getValues().repeats && form.getValues().dueAt && (
          <div className="mb-2">
            <FormField
              control={form.control}
              name="repeatPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Repeat period:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={defaultValues.repeatPeriod || "weekly"}
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
            <FormField
              control={form.control}
              name="repeatEndDate"
              render={({ field }) => (
                <FormItem className="mb-6 mt-2">
                  <FormLabel className="sr-only">End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "mt-4 w-full justify-start text-left font-normal",
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
                        disabled={(d) => {
                          const dueDate = form.getValues().dueAt;
                          if (!dueDate) return false;
                          return d <= dueDate;
                        }}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Repeats will stop at the specified day or the closest
                    relevant day before.
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
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
                  className="flex -translate-y-2 flex-wrap justify-center md:justify-evenly"
                >
                  {pcVals.map((ele) => (
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
                            "bg-secondary hover:bg-primary/50 h-8 w-8",
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
                  className="flex -translate-y-2 flex-wrap justify-center md:justify-evenly"
                >
                  {pcVals.map((ele) => (
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
                            "bg-secondary hover:bg-primary/50 h-8 w-8",
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
            <FormItem className="mb-10 mt-1 max-w-[640px]">
              <FormLabel>Tags:</FormLabel>
              <FormControl>
                <InputTags
                  activeTags={activeTags}
                  setActiveTags={setActiveTags}
                  {...field}
                />
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
        <Button type="submit" className="mt-6 transition-all hover:scale-105">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;
