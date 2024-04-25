import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Calendar from './calendar/index.jsx'
import Login from './login/index.jsx'
const baseName = 'ambidata_PIA__frontend'
const router = createBrowserRouter([
  {path:`${baseName}/`,element:<App/>},
  {path:`${baseName}/calendar`,element:<Calendar/>},
  {path:`${baseName}/login`,element:<Login/>},
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
