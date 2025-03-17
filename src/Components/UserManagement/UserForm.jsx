import React, { useState } from 'react';
import './UserManagement.css';

const UserForm = ({ addUser }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('User');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newUser = { id: Date.now(), name, role };
      addUser(newUser);
      setName('');
      setRole('User');
    }
  };

  return (
    <div className="user-form">
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="User">User</option>
            <option value="Vendor">Vendor</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
