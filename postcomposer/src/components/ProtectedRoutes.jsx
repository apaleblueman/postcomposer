import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({children, allowedRoles}){
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const role = useSelector((state)=>state.auth.role);
    if((!isLoggedIn)||(!allowedRoles.includes(role))){
        return <Navigate to="/" />
    }
    return children;
}

export default ProtectedRoutes;