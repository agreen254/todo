import z from "zod";

const todoFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "title is required." })
    .max(50, { message: "title must be 50 characters or shorter." }),
  description: z
    .string()
    .max(150, { message: "description must be 150 characters or shorter." }),
  tags: z
    .array(
      z.string().max(16, { message: "tags must be 16 characters or shorter." })
    )
    .max(6, { message: "todos must have 6 tags or less." }),
});
export type TodoFormData = z.infer<typeof todoFormSchema>;

export const searchFormSchema = z.object({
  query: z
    .string()
    .max(255, { message: "Queries are limited to 255 characters." }),
  type: z.enum(["name", "description", "dueAt"], {
    required_error: "You need to select a notification type.",
  }),
});
export type SearchFormData = z.infer<typeof searchFormSchema>;
// We need the default values because shad forms are controlled.
// If we do not provide these, it will throw an error because we changed
// from an undefined value for one of the fields.
export const searchFormDefaults: Partial<SearchFormData> = {
  query: "",
  type: "name",
};
