// Example usage in a component
"use client";

import { useAuth } from "../app/context/AuthContext";

const UserProfile = () => {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserProfile;
