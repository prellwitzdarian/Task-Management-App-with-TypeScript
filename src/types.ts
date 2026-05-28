export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  createdBy: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export interface Auth0UserData {
  name?: string;
  email?: string;
  sub?: string;
  picture?: string;
}
