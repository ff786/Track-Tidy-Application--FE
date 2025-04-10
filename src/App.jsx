// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Components
import UserManagement from './Components/UserManagement/UserManagement';
import EditVendorForm from './Components/UserManagement/EditVendorForm.jsx';
import Login from './Components/Auth/Login.jsx';
import Signup from './Components/Auth/Signup.jsx';
import UserServices from './Components/TrackServicesHome/UserServices.jsx';
import UsersList from './Components/UserManagement/UserList.jsx';
import EditUserForm from './Components/UserManagement/EditUserForm.jsx';
import TrackTidyHomePage from './Home.jsx';
import ForgotPassword from './Components/Auth/ForgotPassword.jsx';
import { ResetPassword } from './Components/Auth/ResetPassword.jsx';

// Function to get user role from localStorage
const getUserRole = () => localStorage.getItem("userRole");

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/dashboard', element: <TrackTidyHomePage /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },

  // Protected Routes
  {
    path: '/user-management',
    element: getUserRole() === 'Admin' ? <UserManagement /> : <Login />
  },
  {
    path: '/user-list',
    element: sessionStorage.getItem('isAdmin') === 'true' ? <UsersList /> : <Navigate to="/" />
  },
  
  {
    path: '/edit-vendor/:id',
    element: getUserRole() === 'Admin' ? <EditVendorForm /> : <Login />
  },
  {
    path: '/edit-user/:id',
    element: getUserRole() === 'Admin' ? <EditUserForm /> : <Login />
  },
  {
    path: '/user-services',
    element: <UserServices />
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
