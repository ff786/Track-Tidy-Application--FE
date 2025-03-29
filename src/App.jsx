import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import UserForm from './Components/UserManagement/UserForm.jsx';
import UserList from './Components/UserManagement/UserList.jsx';
import Login from './Components/Auth/Login.jsx';
import Signup from './Components/Auth/Signup.jsx';
import UserServices from './Components/TrackServicesHome/UserServices.jsx';
import ForgotPassword from './Components/Auth/Forgot-password.jsx';
import EditVendorForm from './Components/UserManagement/EditVendorForm.jsx';

// Function to check user role
const getUserRole = () => {
    return localStorage.getItem("userRole"); // Assume role is stored after login
};

const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/signup', element: <Signup /> },

    // Role-Based Protected Routes
    {
        path: '/user-management',
        element: <UserList/>
        //element: getUserRole() === 'admin' ? <UserList /> : <Login />
    },
    {
        path: '/user-services',
        element: <UserServices />
    },
    {
        path:'/forgot-password',
        element:<ForgotPassword />
    },
    {
        path: '/edit-vendor/:id',
        element: <EditVendorForm />
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
