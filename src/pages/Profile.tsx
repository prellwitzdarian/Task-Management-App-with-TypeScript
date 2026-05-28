import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="card">Loading profile...</div>;
  }

  return (
    <div className="card">
      <h1 className="section-title">Your profile</h1>
      {user ? (
        <div className="form-grid">
          <div>
            <label>Name</label>
            <div>{user.name ?? "Anonymous"}</div>
          </div>
          <div>
            <label>Email</label>
            <div>{user.email ?? "Unknown"}</div>
          </div>
          <div>
            <label>Auth0 ID</label>
            <div>{user.sub ?? "Unavailable"}</div>
          </div>
        </div>
      ) : (
        <p>User data is not available.</p>
      )}
    </div>
  );
}
