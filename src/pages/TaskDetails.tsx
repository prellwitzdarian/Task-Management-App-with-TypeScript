import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useTaskContext } from "../context/TaskContext";

const statusStyles: Record<string, string> = {
  todo: "status-pill status-todo",
  "in-progress": "status-pill status-in-progress",
  done: "status-pill status-done",
};

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const { tasks, deleteTask } = useTaskContext();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const task = useMemo(
    () => tasks.find((entry) => entry.id === id),
    [tasks, id],
  );

  if (!task) {
    return (
      <div className="card">
        <h2>Task not found</h2>
        <p>
          The selected task does not exist. Go back to the dashboard to
          continue.
        </p>
        <button className="button-link" onClick={() => navigate("/")}>
          Return to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="label-row">
        <div>
          <h1>{task.title}</h1>
          <div className={statusStyles[task.status]}>
            {task.status.replace("-", " ")}
          </div>
        </div>
        <span className="badge">Due {task.dueDate}</span>
      </div>
      <p>{task.description}</p>
      <div className="task-actions">
        <button className="button-link" onClick={() => navigate("/")}>
          Dashboard
        </button>
        {isAuthenticated && (
          <>
            <button
              className="button-link secondary-button"
              onClick={() => navigate(`/edit/${task.id}`)}
            >
              Edit task
            </button>
            <button
              className="secondary-button"
              onClick={() => {
                deleteTask(task.id);
                navigate("/");
              }}
            >
              Delete task
            </button>
          </>
        )}
      </div>
    </div>
  );
}
