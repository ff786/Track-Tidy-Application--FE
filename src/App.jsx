import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Components

import EditVendorForm from './Components/UserManagement/EditVendorForm.jsx';
import Login from './Components/Auth/Login.jsx';
import Signup from './Components/Auth/Signup.jsx';
import UserServices from './Components/TrackServicesHome/UserServices.jsx';
import UsersList from './Components/UserManagement/UserList.jsx';
import TrackTidyHomePage from './Home.jsx';
import AddInventory from './Components/HomeInventory/addInventory.jsx';
import ViewInventory from './Components/HomeInventory/viewInventory.jsx';
import UpdateInventory from './Components/HomeInventory/updateInventory.jsx';
import ViewOneInventory from './Components/HomeInventory/ViewOneInventory.jsx';
import InventoryPage from './Components/HomeInventory/inventoryPage.jsx';

// Function to get user role from localStorage
const getUserRole = () => localStorage.getItem("userRole");

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Login /> 
  },
  { 
    path: '/dashboard', 
    element: <TrackTidyHomePage /> 
  },
  { 
    path: '/signup', 
    element: <Signup /> 
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
    path: '/add-in',
    element: <AddInventory />
  },
  {
    path: '/view-in',
    element: <ViewInventory />
  },
  {
    path: '/update-in/:id',
    element: <UpdateInventory />
  },
  {
    path: '/view-one-in/:id',
    element: <ViewOneInventory />
  },
  {
    path: '/in-page',
    element: <InventoryPage />
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