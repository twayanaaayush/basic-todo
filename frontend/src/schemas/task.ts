import { z } from "zod";
import { TaskPriority, TaskStatus } from "../api/task";

export const taskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(50),
  description: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(500)
    .optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.Pending),
  dueDate: z.string().optional(),
});

export type TaskInput = z.infer<typeof taskSchema>;
