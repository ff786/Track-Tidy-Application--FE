import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



import UserForm from './Components/UserManagement/UserForm.jsx';
import UserList from './Components/UserManagement/UserList.jsx';

import Login from './Components/HomeIndexLogin/IndexLogin.jsx';
import UserServices from './Components/TrackServicesHome/UserServices.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
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
    
]);

function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
