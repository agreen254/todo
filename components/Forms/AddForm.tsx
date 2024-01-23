"use client";

import z from "zod";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import { add, format, sub } from "date-fns";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { TodoFormData as FormData } from "@/validation/schema";
import { todoFormSchema as formSchema } from "@/validation/schema";
import { todoFormDefaults as defaultValues } from "@/validation/schema";
import TodoContext from "@/contexts/TodoContext";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import TagBadge from "../TodoCard/TodoCardTagBadge";

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const AddForm = () => {
  const [currentTags, setCurrentTags] = useState<string>("");
  const [formTags, setFormTags] = useState<string[]>([]);
  const {
    state: {
      tags: { allTags },
    },
  } = useContext(TodoContext);

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

  const handleAddTags = (input: string) => {
    const processedTags = input
      .toLowerCase()
      .split(",")
      .map((tag) => tag.trim());

    const newTags = processedTags.filter((tag) => !formTags.includes(tag));
    setFormTags([...formTags, ...newTags]);
    setCurrentTags("");
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
              <FormLabel>Title:</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" type="text" {...field} />
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
        {/* <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority:</FormLabel>
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
        /> */}
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
            <FormItem className="max-w-[320px]">
              <div className="flex flex-col space-y-2 mb-4">
                <FormLabel htmlFor="tags">Tags:</FormLabel>
                <Input
                  id="tags"
                  placeholder="Enter tags"
                  value={currentTags}
                  onChange={(e) => setCurrentTags(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTags(currentTags);
                    }
                  }}
                />
              </div>
              <div
                className={cn(
                  "max-h-[6rem] overflow-y-auto mb-4 px-5 py-3 border rounded-full"
                )}
              >
                <p className="flex flex-wrap">
                  {field.value.length === 0 && (
                    <span className="text-muted-foreground text-sm italic">
                      no tags selected
                    </span>
                  )}
                  {field.value.map((tag) => (
                    <TagBadge
                      key={tag}
                      tag={tag}
                      handleClick={() =>
                        setFormTags(formTags.filter((t) => t !== tag))
                      }
                    >
                      {tag}
                      <X className="w-4 h-4 ml-1" />
                    </TagBadge>
                  ))}
                </p>
              </div>
              <div className="space-x-2">
                {allTags.map((tag) => (
                  <TagBadge
                    key={tag.name}
                    tag={tag.name}
                    handleClick={() => handleAddTags(tag.name)}
                  >
                    {tag.name}
                    <Plus className="w-4 h-4 ml-1" />
                  </TagBadge>
                ))}
              </div>
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
