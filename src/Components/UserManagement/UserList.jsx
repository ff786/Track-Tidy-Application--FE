import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", mobileNumber: "1234567890", role: "Admin" },
    { id: 2, firstName: "Alice", lastName: "Brown", email: "alice@example.com", mobileNumber: "0987654321", role: "User" },
  ]);

  useEffect(() => {
    if (location.state?.userData) {
      const newUser = { ...location.state.userData, id: users.length + 1 };
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
  }, [location.state]);

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User List</h2>
      <div style={styles.userListContainer}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} style={styles.card}>
              <p style={styles.text}><strong>First Name:</strong> {user.firstName}</p>
              <p style={styles.text}><strong>Last Name:</strong> {user.lastName}</p>
              <p style={styles.text}><strong>Email:</strong> {user.email}</p>
              <p style={styles.text}><strong>Mobile Number:</strong> {user.mobileNumber}</p>
              <p style={styles.text}><strong>Role:</strong> {user.role}</p>
              <div style={styles.buttonContainer}>
                <button style={styles.editButton} onClick={() => navigate(`/edit-user/${user.id}`, { state: { user } })}>
                  Edit
                </button>
                <button style={styles.deleteButton} onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noUser}>No users registered yet.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    height: "100vh",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  userListContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
    textAlign: "left",
    marginBottom: "15px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#555",
  },
  noUser: {
    fontSize: "18px",
    color: "#999",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  editButton: {
    padding: "8px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  deleteButton: {
    padding: "8px 15px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default UserList;
