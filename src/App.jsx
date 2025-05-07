import React, { useState } from 'react'
import './App.css'
import Login from './Components/Auth/Login.jsx';

import UserServices from './Components/TrackServicesHome/UserServices.jsx'
import UserList from './Components/UserManagement/UserList.jsx';
import Signup from './Components/Auth/Signup.jsx';
import AddInventory from './Components/HomeInventory/addInventory.jsx'
import ViewInventory from './Components/HomeInventory/viewInventory.jsx'
import UpdateInventory from './Components/HomeInventory/updateInventory.jsx'
import ViewOneInventory from './Components/HomeInventory/ViewOneInventory.jsx'
import InventoryPage from './Components/HomeInventory/inventoryPage.jsx'

import ServiceRequest from './Components/AllServiceRequest/ServiceRequests.jsx'
import TrackTidyHomePage from "./Components/TrackHome/HomeDashboard.jsx";
import TrackTidyRequests from "./Components/TrackRequests/TrackTidyRequests.jsx";
import TrackPackages from "./Components/TTPackages/TtPackage.jsx";
import TrackTidyGrocery from "./Components/GroceryDisplay/GroceryMarketPlace.jsx";
import HomeInventory from "./Components/InventoryHome/HomeInventory.jsx";

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy.jsx";
import TermsAndConditions from "./Components/Terms&Conditions/Terms.jsx";
import DashboardOverview from "./Components/AdminDashboards/DashBoardAdmin/dashboardAdmin.jsx";
import AdminViewGrocery from "./Components/AdminDashboards/GroceryAdmin/GroceryAdmin.jsx";
import PackagesAdmin from "./Components/AdminDashboards/PackagesAdmin/PackagesAdmin.jsx";



const router = createBrowserRouter([
    {
        path: '/',
        element: <div> <Login /> </div>
    },
    {
        path: '/signup',
        element: <div> <Signup /> </div>
    },
    {
        path: '/dashboard',
        element: <div> <TrackTidyHomePage /> </div>
    },
    {
        path: '/packages',
        element: <div> <TrackPackages /> </div>
    },
    {
        path: '/inventory',
        element: <div> <HomeInventory /> </div>
    },
    {
        path: '/requests',
        element: <div> <TrackTidyRequests /> </div>
    },
    {
        path: '/user-services',
        element: <div> <UserServices /> </div>
    },
    {
        path: '/grocery-home',
        element: <div> <TrackTidyGrocery /> </div>
    },
    {
        path: '/view-grocery',
        element: <div> <AdminViewGrocery /> </div>
    },
    {
        path: '/about-us',
        element: <div> <AboutUs /> </div>
    },
    {
        path: '/privacy-policy',
        element: <div> <PrivacyPolicy /> </div>
    },
    {
        path: '/terms-&-conditions',
        element: <div> <TermsAndConditions /> </div>
    },
    {
        path: '/user-management',
        element: <UserList/>
    },
    {
        path: '/add-in',
        element: <div> <AddInventory /> </div>
    },
    {
        path: '/view-in',
        element: <div> <ViewInventory /> </div>
    },
    {
        path: '/update-in/:id',
        element: <div> <UpdateInventory /> </div>
    },
    {
        path: '/view-one-in/:id',
        element: <div> <ViewOneInventory /> </div>
    },
    {
        path: '/in-page',
        element: <div> <InventoryPage /> </div>
    },
    {
        path: '/view-service',
        element: <div> <ServiceRequest /> </div>
    },
    {
        path: '/admin/bgi/dashboard',
        element: <div> <DashboardOverview /> </div>
    },
    {
        path: '/view-packages',
        element: <div> <PackagesAdmin /> </div>
    },
])

function App() {

  return (
      <div>
          <RouterProvider router={router} />
      </div>
  )
}

export default App;
