import { useNavigate } from "react-router-dom";
import LoginForm from "../components/user/LoginForm";
import PageHeader from "../components/common/PageHeader";
import { fetchUsers } from "../utils/api";
import { useAuth } from "../context/AuthProvider"; 
import useToast from '../hooks/useToast';

const Login = () => {
    const navigate = useNavigate();
    const { loginWithApiUser } = useAuth(); 
    const { notifyError, notifySuccess } = useToast(); // ← Agregar notifySuccess

    const handleLogin = async ({ usuario, password }) => {
        if (!usuario || !password || usuario.trim() === '' || password.trim() === '') {
            notifyError('Por favor, completá todos los campos');
            return;
        }

        try {
            const users = await fetchUsers();
            const user = users.find(
                (u) => u.username === usuario && u.password === password
            );

            if (user) {
                loginWithApiUser(usuario);
                navigate(`/perfil/${usuario}`);
            } else {
                notifyError('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            notifyError('Error al iniciar sesión');
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