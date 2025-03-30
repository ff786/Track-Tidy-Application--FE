import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import missing components
//import UserList from './Components/UserManagement/UserList.jsx';
//import EditVendorForm from './Components/UserManagement/EditVendorForm.jsx';
import Login from './Components/Auth/Login.jsx';
import Signup from './Components/Auth/Signup.jsx';
import UserServices from './Components/TrackServicesHome/UserServices.jsx';

// Function to check user role
const getUserRole = () => {
    return localStorage.getItem("userRole"); // Assume role is stored after login
};

const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/signup', element: <Signup /> },

    // Role-Based Protected Routes
   /* {
        path: '/user-management',
        element: getUserRole() === 'admin' ? <UserList /> : <Login />
    },*/
    {
        path: '/user-services',
        element: <UserServices />
    },
    
   /* {
        path: '/edit-vendor/:id',
        element: <EditVendorForm />
    },*/
]);

function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
