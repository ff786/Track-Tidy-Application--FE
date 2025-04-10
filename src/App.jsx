// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import components
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

// Function to check user role
const getUserRole = () => {
  return localStorage.getItem("userRole");
};

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/dashboard', element: <TrackTidyHomePage /> },

  // Role-Based Protected Routes
  {
    path: '/user-management',
    element: getUserRole() === 'Admin' ? <UserManagement /> : <Login />
  },
  {
    path: '/user-services',
    element: <UserServices />
  },
  {
    path: '/edit-vendor/:id',
    element: <EditVendorForm />
  },
  {
    path: '/user-list',
    element: getUserRole() === 'Admin' || getUserRole() === 'User' ? <UsersList /> : <Login />
  },
  {
    path: '/edit-user/:id',
    element: <EditUserForm />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
