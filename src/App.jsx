import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import UserForm from './Components/UserManagement/UserForm.jsx';
import UserList from './Components/UserManagement/UserList.jsx';
import Login from './Components/HomeIndexLogin/IndexLogin.jsx';
import Signup from './Components/HomeIndexLogin/Signup.jsx';
import UserServices from './Components/TrackServicesHome/UserServices.jsx';

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
        element: getUserRole() === 'admin' ? <UserList /> : <Login />
    },
    {
        path: '/user-services',
        element: getUserRole() === 'vendor' ? <UserServices /> : <Login />
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
