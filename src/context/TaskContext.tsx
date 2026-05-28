import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Task, TaskFormValues } from "../types";

interface TaskContextValue {
  tasks: Task[];
  loading: boolean;
  addTask: (task: TaskFormValues) => void;
  updateTask: (taskId: string, updates: TaskFormValues) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

const STORAGE_KEY = "task-management-tasks";

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Design dashboard layout",
    description: "Create components and wireframe the task dashboard layout.",
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    status: "in-progress",
    createdBy: "system",
  },
  {
    id: "task-2",
    title: "Integrate Auth0 login",
    description:
      "Wire Auth0 authentication to protect task creation and editing pages.",
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10),
    status: "todo",
    createdBy: "system",
  },
];

function loadStoredTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialTasks;

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return initialTasks;
  } catch {
    return initialTasks;
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => loadStoredTasks());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskForm: TaskFormValues) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      createdBy: "authenticated-user",
      ...taskForm,
    };
    setTasks((current) => [newTask, ...current]);
  };

  const updateTask = (taskId: string, updates: TaskFormValues) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task,
      ),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  const value = useMemo(
    () => ({ tasks, loading, addTask, updateTask, deleteTask }),
    [tasks, loading],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
