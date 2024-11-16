import { Response } from "express";
import {
  createTaskSchema,
  taskFilterSchema,
  taskIdSchema,
  updateTaskSchema,
} from "@/dtos";
import { AppError, ValidatedAuthenticatedRequest } from "@/middlewares";
import { TaskModel, TaskStatus } from "@/models";
import { getObjectId } from "@/utils";

export async function createTaskController(
  req: ValidatedAuthenticatedRequest<typeof createTaskSchema>,
  res: Response
) {
  const { _id: userId } = req.user;
  const taskDto = req.validated.body;

  const task = await TaskModel.create({
    ...taskDto,
    userId: getObjectId(userId),
    status: taskDto.status || TaskStatus.Pending,
  });

  res.status(201).json(task);
}

export async function getTasksController(
  req: ValidatedAuthenticatedRequest<typeof taskFilterSchema>,
  res: Response
) {
  const { _id: userId } = req.user;
  const { page, limit, ...filters } = req.validated.query;

  const tasksQuery = TaskModel.find({
    userId: getObjectId(userId),
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.priority ? { priority: filters.priority } : {}),
    ...(filters.dueDate ? { dueDate: filters.dueDate } : {}),
  });

  if (page && limit) {
    tasksQuery.skip((page - 1) * limit).limit(limit);
  }

  const [tasks, count] = await Promise.all([
    tasksQuery.sort({ createdAt: -1 }).exec(),
    TaskModel.countDocuments(tasksQuery.getQuery()),
  ]);

  const paginationMetadata = {
    currentPage: page || 1,
    currentLimit: limit || 0,
    totalItems: count,
    totalPages: limit ? Math.ceil(count / limit) : 1,
  };

  res.status(200).json({ tasks, metadata: paginationMetadata });
}

export async function getTaskController(
  req: ValidatedAuthenticatedRequest<typeof taskIdSchema>,
  res: Response
) {
  const { _id: userId } = req.user;
  const { id: taskId } = req.validated.params;

  const task = await TaskModel.findOne({
    _id: getObjectId(taskId),
    userId: getObjectId(userId),
  });

  if (!task) throw new AppError("Task not found.", 404);

  res.status(200).json(task);
}

export async function updateTaskController(
  req: ValidatedAuthenticatedRequest<typeof updateTaskSchema>,
  res: Response
) {
  const { _id: userId } = req.user;

  const {
    body,
    params: { id: taskId },
  } = req.validated;
  const taskDto = body;

  const task = await TaskModel.findOneAndUpdate(
    {
      _id: getObjectId(taskId),
      userId: getObjectId(userId),
    },
    {
      $set: taskDto,
    },
    { new: true }
  );

  if (!task) throw new AppError("Task not found.", 404);

  res.status(200).json(task);
}

export async function deleteTaskController(
  req: ValidatedAuthenticatedRequest<typeof taskIdSchema>,
  res: Response
) {
  const { _id: userId } = req.user;
  const { id: taskId } = req.validated.params;

  const deleteResult = await TaskModel.deleteOne({
    _id: getObjectId(taskId),
    userId: getObjectId(userId),
  });

  if (deleteResult.deletedCount === 0)
    throw new AppError(
      "Task couldn't be deleted. Id mismatch or Insufficient permissions.",
      400
    );

  res.sendStatus(204);
}
