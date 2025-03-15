import React, { useState } from 'react'
import './App.css'

import Login from './Components/HomeIndexLogin/IndexLogin.jsx'
import AddInventory from './Components/Home_Inventory/addInventory.jsx'
import UpdateInventory from './Components/Home_Inventory/updateInventory.jsx'
import ViewInventory from './Components/Home_Inventory/viewInventory.jsx'
import viewOneInventory from './Components/Home_Inventory/viewOneInventory.jsx'

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
        path: '/add-in',  
        element: <AddInventory /> 
    },
    {
        path: '/update-in',  
        element: <UpdateInventory /> 
    },
    {
        path: '/view-in',  
        element: <ViewInventory /> 
    },
    {
        path: '/viewOne-in',  
        element: <div><viewOneInventory /> </div> 
    }
])

function App() {

  return (
      <div>
          <RouterProvider router={router} />
      </div>
  )
}

export default App
