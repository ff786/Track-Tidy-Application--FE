import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import './UserManagement.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  
  // Fetching users (could be from an API)
  useEffect(() => {
    // For now, using static data
    setUsers([
      { id: 1, name: 'John Doe', role: 'User' },
      { id: 2, name: 'Jane Smith', role: 'Vendor' },
      { id: 3, name: 'Tom Brown', role: 'Staff' },
    ]);
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <UserForm addUser={addUser} />
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <span>{user.name}</span>
            <span className="user-role">{user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
