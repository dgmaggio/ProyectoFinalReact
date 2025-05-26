import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const isAuth = localStorage.getItem("auth") === "true";

	if (!isAuth) return <Navigate to="/login" replace />;

	return <Outlet />;
};

export default PrivateRoute;