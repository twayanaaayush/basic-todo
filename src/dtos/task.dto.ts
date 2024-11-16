import { z } from "zod";
import { createValidationSchema } from "@/middlewares";
import {
  MAX_TASK_DESCRIPTION_LENGTH,
  MAX_TASK_TITLE_LENGTH,
  TaskPriority,
  TaskStatus,
} from "@/models";

export const createTaskSchema = createValidationSchema({
  body: {
    title: z.string().trim().max(MAX_TASK_TITLE_LENGTH),
    description: z.string().trim().max(MAX_TASK_DESCRIPTION_LENGTH),
    dueDate: z.coerce.date(),
    priority: z.enum(Object.values(TaskPriority) as [string, ...string[]]),
    status: z
      .enum(Object.values(TaskStatus) as [string, ...string[]])
      .optional(),
    order: z.number().optional(),
  },
});

export const updateTaskSchema = createValidationSchema({
  body: {
    title: z.string().trim().max(MAX_TASK_TITLE_LENGTH).optional(),
    description: z.string().trim().max(MAX_TASK_DESCRIPTION_LENGTH).optional(),
    dueDate: z.coerce.date().optional(),
    priority: z
      .enum(Object.values(TaskPriority) as [string, ...string[]])
      .optional(),
    status: z
      .enum(Object.values(TaskStatus) as [string, ...string[]])
      .optional(),
  },
  params: {
    id: z.string(),
  },
});

export const taskIdSchema = createValidationSchema({
  params: {
    id: z.string(),
  },
});

export const taskFilterSchema = createValidationSchema({
  query: {
    // filters
    status: z
      .enum(Object.values(TaskStatus) as [string, ...string[]])
      .optional(),
    priority: z
      .enum(Object.values(TaskPriority) as [string, ...string[]])
      .optional(),
    dueDate: z.coerce.date().optional(),

    // pagination
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).optional(),
  },
});
