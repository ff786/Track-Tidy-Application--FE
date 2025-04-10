// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
import ProtectedRouteAdmin from './Components/Auth/ProtectROuteAdmin.jsx';

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
    path: '/user-list',
    element: (
      <ProtectedRouteAdmin>
        <UsersList />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: '/user-management',
    element: (
      <ProtectedRouteAdmin>
        <UserManagement />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: '/edit-vendor/:id',
    element: (
      <ProtectedRouteAdmin>
        <EditVendorForm />
      </ProtectedRouteAdmin>
    ),
  },
  {
    path: '/edit-user/:id',
    element: (
      <ProtectedRouteAdmin>
        <EditUserForm />
      </ProtectedRouteAdmin>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
;
