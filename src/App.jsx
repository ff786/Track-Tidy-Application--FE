import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import UserForm from './Components/UserManagement/UserForm.jsx';

import Login from './Components/HomeIndexLogin/IndexLogin.jsx';
import UserServices from './Components/TrackServicesHome/UserServices.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/user-profile',
        element: <UserProfile />
    },
    {
        path: '/user-management',
        element: <UserList />
    },
    {
        path: '/user-services',
        element: <UserServices />
    },
    {
        path: '/auth',
        element: <Auth />
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
