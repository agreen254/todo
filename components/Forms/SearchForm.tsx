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
import { cn } from "@/utils/cn";

const SearchForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`search?query=${data.query.trim()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-[min(350px,calc(90vw-4rem))] ml-4 lg:ml-0"
      >
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
                  className="px-3 py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6" />
              <Button
                variant="ghost"
                size="icon"
                type="submit"
                className="absolute right-[5px] top-[4px]"
              >
                <Search className="w-[50%] h-[50%]" />
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchForm;
