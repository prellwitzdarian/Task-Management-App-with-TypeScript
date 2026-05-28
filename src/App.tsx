import { Routes, Route, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import TaskFormPage from "./pages/TaskFormPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <Link to="/" className="brand">
            Task Manager
          </Link>
        </div>
        <nav>
          <Link to="/">Dashboard</Link>
          {isAuthenticated ? <Link to="/profile">Profile</Link> : null}
          {isAuthenticated ? (
            <button
              className="ghost-button"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="button-link">
              Login
            </Link>
          )}
        </nav>
      </header>

      <main className="site-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <TaskFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <TaskFormPage editMode />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
