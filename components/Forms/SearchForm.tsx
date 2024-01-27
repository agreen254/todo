"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { searchFormSchema as formSchema } from "@/validation/schema";
import { searchFormDefaults as defaultValues } from "@/validation/schema";
import { SearchFormData as FormData } from "@/validation/schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/utils/cn";

const SearchForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`search?query=${data.query.trim()}&type=${data.type}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">enter query</FormLabel>
              <FormControl>
                <Input
                  placeholder="search to-dos"
                  type="text"
                  className="px-3 py-6 w-[min(350px,90vw)]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Button
                variant="ghost"
                size="icon"
                type="submit"
                className={cn("absolute right-[5px] top-[-3px]", form.formState.errors?.query?.message && "bottom-[4rem]")}
              >
                <Search className="w-[50%] h-[50%]" />
              </Button>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">Select search type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-x-3 mt-[-30px] mb-4 w-full flex justify-start"
                >
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="name" />
                    </FormControl>
                    <FormLabel className="font-semibold ml-[6px] translate-y-[-4px]">
                      name
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="description" />
                    </FormControl>
                    <FormLabel className="font-semibold ml-[6px] translate-y-[-4px]">
                      description
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="dueAt" />
                    </FormControl>
                    <FormLabel className="font-semibold ml-[6px] translate-y-[-4px]">
                      due date
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchForm;
