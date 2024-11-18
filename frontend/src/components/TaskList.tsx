import React from "react";
import { Task, TaskStatus } from "../api/task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onChangeStatus: (id: string, status: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onComplete,
  onChangeStatus,
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex flex-col justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-lg ${
                    task.status === TaskStatus.Completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
                <div className="space-x-2">
                  {task.status !== TaskStatus.Completed && (
                    <button
                      onClick={() => onComplete(task._id)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <select
                  value={task.status}
                  onChange={(e) =>
                    onChangeStatus(task._id, e.target.value as TaskStatus)
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={TaskStatus.Pending}>Pending</option>
                  <option value={TaskStatus.InProgress}>In Progress</option>
                  <option value={TaskStatus.Completed}>Completed</option>
                </select>
                <div className="text-sm text-gray-500">
                  Priority:{" "}
                  <span className="font-medium">{task.priority || "None"}</span>
                </div>
                {task.dueDate && (
                  <div className="text-sm text-gray-500">
                    Due Date:{" "}
                    <span className="font-medium">{task.dueDate}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
