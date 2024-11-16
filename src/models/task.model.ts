import { InferSchemaType, Schema, Types, model } from "mongoose";

export const MAX_TASK_TITLE_LENGTH = 50;
export const MAX_TASK_DESCRIPTION_LENGTH = 500;

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export enum TaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: MAX_TASK_TITLE_LENGTH,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
      maxLength: MAX_TASK_TITLE_LENGTH,
      trim: true,
    },
    priority: {
      type: String,
      required: false,
      enum: Object.values(TaskPriority),
      default: undefined,
    },
    dueDate: {
      type: Date,
      required: false,
      default: undefined,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TaskStatus),
      default: TaskStatus.Pending,
    },
    order: {
      type: Number,
      required: false,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

export type Task = InferSchemaType<typeof taskSchema> & {
  _id: Types.ObjectId;
};

export const TaskModel = model("task", taskSchema);
