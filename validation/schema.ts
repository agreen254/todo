import z from "zod";

export const todoFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(100, { message: "Name must be 100 characters or shorter." }),
  description: z
    .string()
    .max(250, { message: "Description must be 250 characters or shorter." }),
  priority: z.number().min(0).max(10),
  complexity: z.number().min(0).max(10),
  createdAt: z.date().optional(),
  dueAt: z.date().optional(),
  repeats: z.boolean(),
  repeatPeriod: z.union([
    z.literal("daily"),
    z.literal("weekly"),
    z.literal("monthly"),
  ]),
  repeatEndDate: z.date().optional(),
  tags: z
    .string()
    .array()
    .max(8, { message: "Todos must have 8 tags or less." }),
  subTasks: z.string().array(),
  completedSubTasks: z.boolean().array(),
  id: z.string().optional(),
  repeatId: z.string().optional(),
  isCompleted: z.boolean().optional(),
  isPinned: z.boolean().optional(),
});
export type TodoFormData = z.infer<typeof todoFormSchema>;
// We need the default values because shad forms are controlled.
// If we do not provide these, it will throw an error because we changed
// from an undefined value for one of the fields.
export const todoFormDefaults: Partial<TodoFormData> = {
  name: "",
  description: "",
  repeats: false,
  repeatPeriod: "monthly",
  priority: 3,
  complexity: 3,
  tags: [],
  subTasks: [],
  completedSubTasks: [],
  isCompleted: false,
  isPinned: false,
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
