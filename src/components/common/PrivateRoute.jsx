import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../context/AuthProvider';

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth(); // ← Agregar loading
    
    // ✅ ESPERAR a que termine de cargar
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }
    
    // ✅ Solo redirigir DESPUÉS de cargar
    if (!isAuthenticated()) return <Navigate to="/login" replace />;
    
    return <Outlet />;
};

export default PrivateRoute;