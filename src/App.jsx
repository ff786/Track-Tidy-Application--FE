import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Components
import Login from './Components/Auth/Login.jsx';
import Signup from './Components/Auth/Signup.jsx';
import UserServices from './Components/TrackServicesHome/UserServices.jsx';
import UsersList from './Components/UserManagement/UserList.jsx';
import TrackTidyHomePage from './Home.jsx';
import ResetPassword from './Components/Auth/ResetPassword.jsx';
import EditUser from './Components/UserManagement/EditUser.jsx';
import ForgotPassword from './Components/Auth/ForgotPassword.jsx';
import OtpVerification from './Components/Auth/OtpVerification.jsx';
// Function to check if user is admin
const isAdmin = () => {
  return sessionStorage.getItem('isAdmin') === 'true' || 
         localStorage.getItem('userRole') === 'admin';
};

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/dashboard', element: <TrackTidyHomePage /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/otp-verification', element: <OtpVerification/>},

  // Protected Routes
  {
    path: '/user-list',
    element: isAdmin() ? <UsersList /> : <Navigate to="/" />
  },
  {
    path: '/edit-user/:id',
    element: isAdmin() ? <EditUser /> : <Navigate to="/" />
  },
  {
    path: '/user-services',
    element: <UserServices />
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;