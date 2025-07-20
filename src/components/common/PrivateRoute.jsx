import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../context/AuthProvider'; // ← Agregá esto

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth(); // ← Usá el contexto
    
    if (!isAuthenticated()) return <Navigate to="/login" replace />;
    
    return <Outlet />;
};

export default PrivateRoute;