import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Role: {user?.role}</p>
      <button onClick={() => navigate("/profile")}>View Profile</button>
      <button onClick={() => navigate("/users")}>Manage Users</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
