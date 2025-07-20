import { useNavigate } from "react-router-dom";
import LoginForm from "../components/user/LoginForm";
import PageHeader from "../components/common/PageHeader";
import toast, { Toaster } from 'react-hot-toast';
import { fetchUsers } from "../utils/api";
import { useAuth } from "../context/AuthProvider"; // ← Agregá esto

const Login = () => {
  const navigate = useNavigate();
  const { loginWithApiUser } = useAuth(); // ← Agregá esto

  const handleLogin = async ({ usuario, password }) => {
    if (!usuario || !password || usuario.trim() === '' || password.trim() === '') {
      toast.error('Por favor, completá todos los campos');
      return;
    }

    try {
      const users = await fetchUsers();
      const user = users.find(
        (u) => u.username === usuario && u.password === password
      );

      if (user) {
        loginWithApiUser(usuario); // ← Usá la nueva función
        navigate(`/perfil/${usuario}`);
      } else {
        toast.error('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      toast.error('Error al iniciar sesión');
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