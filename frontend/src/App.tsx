import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import {
  createTask,
  deleteTask,
  getTasks,
  markAsComplete,
  Task,
  TaskStatus,
  updateTask,
} from "./api/task";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { TaskInput } from "./schemas/task";

const App: React.FC = () => {
  const { token, handleLogin, handleLogout, handleRegistration } = useAuth();
  const [registering, setRegistering] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const onRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await handleRegistration(username, email, password);
      setRegistering(false);
    } catch {
      setRegistering(false);
    }
  };

  const fetchTodos = async () => {
    if (!token) return;
    try {
      const response = await getTasks(token);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleAddTask = async (data: TaskInput) => {
    if (!token) return;

    try {
      const response = await createTask(data, token);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!token) return;

    try {
      await deleteTask(id, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleCompleteTask = async (id: string) => {
    if (!token) return;

    try {
      await markAsComplete(id, token);
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error("Failed to mark todo as complete:", error);
    }
  };

  const handleChangeStatus = async (id: string, status: TaskStatus) => {
    if (!token) return;

    try {
      await updateTask(id, { status }, token);
      fetchTodos();
    } catch (error) {
      console.error("Failed to change todo status:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-center sm:space-x-4">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <Header token={token} onLogout={handleLogout} />

        <>
          {registering ? (
            <div>
              <RegisterForm onRegister={onRegister} />
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => setRegistering(false)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          ) : !token ? (
            <div>
              <LoginForm onLogin={handleLogin} />
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setRegistering(true)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Register
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="w-[100%] flex space-x-12">
              <TaskForm onAdd={handleAddTask} />
            </div>
          )}
        </>
      </div>

      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
          onChangeStatus={handleChangeStatus}
        />
      </div>
    </div>
  );
};

export default App;
