import React, { useState } from 'react'
import './App.css'

import Login from './Components/HomeIndexLogin/IndexLogin.jsx'

import UserServices from './Components/TrackServicesHome/UserServices.jsx'

import AddInventory from './Components/HomeInventory/addInventory.jsx'
import ViewInventory from './Components/HomeInventory/viewInventory.jsx'
import UpdateInventory from './Components/HomeInventory/updateInventory.jsx'
import ViewOneInventory from './Components/HomeInventory/ViewOneInventory.jsx'
import InventoryPage from './Components/HomeInventory/inventoryPage.jsx'

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <div> <Login /> </div>
    },
    {
        path: '/user-services',
        element: <div> <UserServices /> </div>
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
])

function App() {

  return (
      <div>
          <RouterProvider router={router} />
      </div>
  )
}

export default App
