import z from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(50, { message: "Title must be 50 characters or shorter." }),
  description: z
    .string()
    .max(150, { message: "Description must be 150 characters or shorter." }),
  priority: z.number().min(0).max(10),
  complexity: z.number().min(0).max(10),
  dueAt: z.date().optional(),
  tags: z
    .array(
      z.string().max(15, { message: "Tags must be 15 characters or shorter." })
    )
    .max(6, { message: "Todos must have 6 tags or less." })
});
export type TodoFormData = z.infer<typeof todoFormSchema>;
// We need the default values because shad forms are controlled.
// If we do not provide these, it will throw an error because we changed
// from an undefined value for one of the fields.
export const todoFormDefaults: Partial<TodoFormData> = {
  title: "",
  description: "",
  tags: [],
  priority: 5,
  complexity: 5,
};

export const searchFormSchema = z.object({
  query: z
    .string()
    .max(255, { message: "Queries are limited to 255 characters." })
    .refine((s) => s.trim(), "Please enter a search term."),
  type: z.enum(["name", "description", "dueAt"], {
    required_error: "You need to select a search type.",
  }),
});
export type SearchFormData = z.infer<typeof searchFormSchema>;
export const searchFormDefaults: Partial<SearchFormData> = {
  query: "",
  type: "name",
};
