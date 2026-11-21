import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ allowedRoles }) => {
const { isAuthenticated, user } = useSelector((state) => state.auth);

// Not logged in -> go to login, remember where they were headed  
if (!isAuthenticated || !user) {  
    return <Navigate to="/login" replace />;  
}  

// Logged in but role not allowed -> go to the shared dashboard  
if (allowedRoles && !allowedRoles.includes(user.role)) {  
    return <Navigate to="/" replace />;  
}  

return <Outlet />;

};