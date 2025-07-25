import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../context/AuthProvider';

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }
    
    if (!isAuthenticated()) return <Navigate to="/login" replace />;
    
    return <Outlet />;
};

export default PrivateRoute;