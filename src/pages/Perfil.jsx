import { useParams, Navigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

const Perfil = () => {
	const { username } = useParams();
	const isAuth = localStorage.getItem("auth") === "true";

	if (!isAuth) return <Navigate to="/login" />;

	return (
		
		<section>
			<PageHeader />
			<div className="max-w-md mx-auto p-4">				
				<h1>Bienvenido, {username}</h1>
				<p>Este es tu perfil.</p>
			</div>
		</section>
	);
};

export default Perfil;