import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card">
      <h1>Page not found</h1>
      <p>The route you are looking for does not exist.</p>
      <Link className="button-link" to="/">
        Return to dashboard
      </Link>
    </div>
  );
}
