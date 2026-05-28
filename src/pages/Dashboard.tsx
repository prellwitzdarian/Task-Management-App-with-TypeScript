import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TaskCard from "../components/TaskCard";
import { useTaskContext } from "../context/TaskContext";

export default function Dashboard() {
  const { tasks, deleteTask } = useTaskContext();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <div>
      <section className="hero">
        <div>
          <h1 className="section-title">Your task dashboard</h1>
          <p>
            Track active work, open details, and manage assignments in a single
            place.
          </p>
        </div>
        <div>
          {isAuthenticated ? (
            <button
              className="button-link large-button"
              onClick={() => navigate("/create")}
            >
              Create new task
            </button>
          ) : (
            <Link className="button-link large-button" to="/login">
              Login to manage tasks
            </Link>
          )}
        </div>
      </section>

      <section>
        {tasks.length ? (
          <div className="task-list">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={deleteTask} />
            ))}
          </div>
        ) : (
          <div className="card">
            <h2>No tasks available</h2>
            <p>Create a task to get started with priority planning.</p>
          </div>
        )}
      </section>
    </div>
  );
}
