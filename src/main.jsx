import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Calendar from './calendar/index.jsx'
import Login from './login/index.jsx'
const router = createBrowserRouter([
  {path:"/",element:<App/>},
  {path:"/calendar",element:<Calendar/>},
  {path:"/login",element:<Login/>},
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
