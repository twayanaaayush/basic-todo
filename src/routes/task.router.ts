import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getTaskController,
  getTasksController,
  updateTaskController,
} from "@/controllers";
import {
  createTaskSchema,
  taskFilterSchema,
  taskIdSchema,
  updateTaskSchema,
} from "@/dtos";
import { dtoValidationMiddleware, tryCatchWrapper } from "@/middlewares";

export const taskRouter = express.Router();

taskRouter.get(
  "/",
  dtoValidationMiddleware(taskFilterSchema),
  tryCatchWrapper(getTasksController)
);
taskRouter.post(
  "/",
  dtoValidationMiddleware(createTaskSchema),
  tryCatchWrapper(createTaskController)
);
taskRouter.get(
  "/:id",
  dtoValidationMiddleware(taskIdSchema),
  tryCatchWrapper(getTaskController)
);
taskRouter.patch(
  "/:id",
  dtoValidationMiddleware(updateTaskSchema),
  tryCatchWrapper(updateTaskController)
);
taskRouter.delete(
  "/:id",
  dtoValidationMiddleware(taskIdSchema),
  tryCatchWrapper(deleteTaskController)
);
