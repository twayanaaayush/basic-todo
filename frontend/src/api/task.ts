import axios from "axios";
import { API_URL } from "./base";
import { TaskInput } from "../schemas/task";

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

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  currentPage: number;
  currentLimit: number;
  totalItems: number;
  totalPages: number;
}

export const getTasks = (
  token: string,
  pagination?: { page: number; limit: number },
  filters?: {
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
  }
) => {
  return axios.get<{ tasks: Task[]; metadata: PaginationMetadata }>(
    `${API_URL}/api/tasks/`,
    {
      params: {
        ...(pagination ? pagination : {}),
        ...(filters ? filters : {}),
      },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const createTask = (data: TaskInput, token: string) => {
  return axios.post(`${API_URL}/api/tasks/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = (id: string, token: string) => {
  return axios.delete(`${API_URL}/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = (
  id: string,
  data: Partial<TaskInput>,
  token: string
) => {
  return axios.patch(`${API_URL}/api/tasks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const changeStatus = (id: string, status: TaskStatus, token: string) => {
  return axios.patch(
    `${API_URL}/api/tasks/${id}`,
    {
      status: status,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const markAsComplete = async (id: string, token: string) => {
  return axios.patch(
    `${API_URL}/api/tasks/${id}`,
    { status: TaskStatus.Completed },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
