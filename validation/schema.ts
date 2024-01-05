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
