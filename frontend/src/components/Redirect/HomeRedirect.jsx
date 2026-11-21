import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const HomeRedirect = () => {
const { isAuthenticated, user } = useSelector((state) => state.auth);

if (!isAuthenticated || !user) {  
    return <Navigate to="/login" replace />;  
}  

return <Navigate to="/" />;

};