UserRoles.jsx

import React from 'react';

const UserRoles = ({ selectedRole, handleRoleChange }) => {
  return (
    <div>
      <label>Role:</label>
      <select value={selectedRole} onChange={handleRoleChange}>
        <option value="User">User</option>
        <option value="Vendor">Vendor</option>
        <option value="Staff">Staff</option>
      </select>
    </div>
  );
};

export default UserRoles;
