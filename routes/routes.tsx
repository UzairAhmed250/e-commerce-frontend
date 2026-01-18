import AuthLayout from '../src/components/layout/authlayout'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from '../src/pages/auth/login'
import Register from '../src/pages/auth/register'
import PrivateLayout from '../src/components/layout/privatelayout'
import Welcome from '../src/components/dashboard/welcome'

export default function Routes() {

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    index: true,                    
                    element: <Navigate to="/login" replace />,
                },
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/register',
                    element: <Register   />,
                }
            ],
        },
        {
            path: '/',
            element: <PrivateLayout />,
            children: [
                {
                    index: true,
                    // path: '/dashboard',
                    element: <Navigate to="/dashboard" replace />,
                },
                {
                    path: '/dashboard',
                    element: <Welcome />,
                }
            ]
        }
    ])


  return (
    <div>
        <RouterProvider router={routes} />
    </div>
  )
}
