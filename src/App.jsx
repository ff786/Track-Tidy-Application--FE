import React, { useState } from 'react'
import './App.css'

import Login from './Components/HomeIndexLogin/IndexLogin.jsx'
import UserServices from './Components/TrackServicesHome/UserServices.jsx'
import UserList from './Components/UserManagement/UserList.jsx';

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
        path: '/user-management',
        element: <div><UserList/></div>
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
