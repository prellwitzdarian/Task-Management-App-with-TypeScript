import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    } else if (!isLoading) {
      loginWithRedirect();
    }
  }, [from, isAuthenticated, isLoading, loginWithRedirect, navigate]);

  return (
    <div className="card">
      <h1>Login</h1>
      <p>
        Authenticating with Auth0 so you can access task creation, editing, and
        profile information.
      </p>
      <p>
        If the login screen does not appear, confirm your Auth0 environment
        variables are configured.
      </p>
    </div>
  );
}
