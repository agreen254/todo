"use client";

import z from "zod";
import { useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TodoContext from "@/contexts/TodoContext";
import search from "@/utils/search";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const FormSchema = z.object({
  query: z
    .string()
    .max(255, { message: "Queries are limited to 255 characters." }),
  type: z.enum(["name", "description", "dueAt"], {
    required_error: "You need to select a notification type.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

const defaultValues: Partial<FormData> = {
  query: "",
  type: "name",
};

const AltSearch = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    state: { all },
    dispatch,
  } = useContext(TodoContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const qString = searchParams.get("query") || "";
  const qKind = searchParams.get("type") || "";

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`?query=${data.query}&type=${data.type}`);
  }

  if (!all.length) return;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Query</FormLabel>
              <FormControl>
                <Input placeholder="search query" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="name" />
                    </FormControl>
                    <FormLabel className="font-normal">name</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="description" />
                    </FormControl>
                    <FormLabel className="font-normal">description</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dueAt" />
                    </FormControl>
                    <FormLabel className="font-normal">due at</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AltSearch;
