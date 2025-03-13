import React, { useState } from 'react'
import './App.css'

import Login from './Components/HomeIndexLogin/IndexLogin.jsx'

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <div> <Login /> </div>
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
