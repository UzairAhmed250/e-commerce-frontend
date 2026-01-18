import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"

export default function AuthLayout() {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    
    if(isAuthenticated){
      return <Navigate to="/dashboard" replace />
    }

  return (
    <div>
        <Outlet />
    </div>
  )
}
