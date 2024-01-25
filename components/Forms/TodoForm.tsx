"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import { add, format, sub } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { TodoFormData as FormData } from "@/validation/schema";
import { todoFormSchema as formSchema } from "@/validation/schema";
import { TimePicker12Demo } from "../ui/time-picker/time-picker-12hour";
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
import InputTags from "./InputTags";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { redirect } from "next/navigation";

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
  defaultValues: Partial<FormData>;
};

const TodoForm = ({ defaultValues }: Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    redirect("/");
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
        className="flex flex-col justify-center w-full max-w-[480px] mt-10 gap-y-6 mx-8 mb-[min(3rem,10vh)]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(n) => field.onChange(parseInt(n))}
                  defaultValue={defaultValues?.priority?.toString()}
                  className="flex flex-wrap justify-evenly"
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
            <FormItem>
              <FormLabel>Complexity:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(n) => field.onChange(parseInt(n))}
                  defaultValue={defaultValues?.priority?.toString()}
                  className="flex flex-wrap justify-evenly"
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
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="max-w-[640px]">
              <FormLabel>Tags:</FormLabel>
              <FormControl>
                <InputTags {...field} />
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
