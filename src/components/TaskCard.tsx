import { Link } from "react-router-dom";
import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const statusStyles: Record<Task["status"], string> = {
  todo: "status-pill status-todo",
  "in-progress": "status-pill status-in-progress",
  done: "status-pill status-done",
};

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <article className="card">
      <div className="label-row">
        <div>
          <h2>{task.title}</h2>
          <div className={statusStyles[task.status]}>
            {task.status.replace("-", " ")}
          </div>
        </div>
        <span className="badge">Due {task.dueDate}</span>
      </div>
      <p>{task.description}</p>
      <div className="task-actions">
        <Link className="button-link secondary-button" to={`/task/${task.id}`}>
          View
        </Link>
        <Link className="button-link secondary-button" to={`/edit/${task.id}`}>
          Edit
        </Link>
        <button className="secondary-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
