import { useNavigate } from "react-router-dom";
import LoginForm from "../components/user/LoginForm";
import PageHeader from "../components/common/PageHeader";

const Login = () => {
	const navigate = useNavigate();

	const handleLogin = ({ usuario, password }) => {
		if (usuario && password) {
			localStorage.setItem("auth", "true");
			localStorage.setItem("user", usuario);
			navigate(`/perfil/${usuario}`);
		}
	};

	return (
		<section>
			<PageHeader title="Iniciar sesión" />
			
			<LoginForm onLogin={handleLogin} />
		</section>
	);
};

export default Login;