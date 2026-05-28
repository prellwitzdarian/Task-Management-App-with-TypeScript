import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TaskForm from "../components/TaskForm";
import { useTaskContext } from "../context/TaskContext";
import { TaskFormValues } from "../types";

const defaultValues: TaskFormValues = {
  title: "",
  description: "",
  dueDate: new Date().toISOString().slice(0, 10),
  status: "todo",
};

interface TaskFormPageProps {
  editMode?: boolean;
}

export default function TaskFormPage({ editMode }: TaskFormPageProps) {
  const { id } = useParams<{ id: string }>();
  const { tasks, addTask, updateTask } = useTaskContext();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const existingTask = useMemo(
    () => tasks.find((task) => task.id === id),
    [tasks, id],
  );

  if (!isAuthenticated) {
    loginWithRedirect();
    return <div className="card">Redirecting to login...</div>;
  }

  const initialValues =
    editMode && existingTask
      ? {
          title: existingTask.title,
          description: existingTask.description,
          dueDate: existingTask.dueDate,
          status: existingTask.status,
        }
      : defaultValues;

  const handleSubmit = (values: TaskFormValues) => {
    if (editMode && id) {
      updateTask(id, values);
      navigate(`/task/${id}`);
    } else {
      addTask(values);
      navigate("/");
    }
  };

  return (
    <div>
      <section className="hero">
        <div>
          <h1 className="section-title">
            {editMode ? "Edit task details" : "Create a new task"}
          </h1>
          <p>
            Use the form below to build a clear task record with typed
            validation.
          </p>
        </div>
      </section>
      <TaskForm
        initialValues={initialValues}
        submitLabel={editMode ? "Save changes" : "Create task"}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
