import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateLayout() {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    console.log("PrivateLayout - isAuthenticated:", isAuthenticated);

    if(!isAuthenticated){
        return <Navigate to ="/login" replace />
    }
    return(
        <div>
            <Outlet />
        </div>
    )
}