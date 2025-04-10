// ProtectedRouteAdmin.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children }) => {
  const role = localStorage.getItem('userRole');

  if (role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteAdmin;
