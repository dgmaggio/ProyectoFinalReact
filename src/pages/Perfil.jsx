import { useState, useEffect } from 'react';
import { useParams, Navigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import LoadingMsg from "../components/common/LoadingMsg";
import { fetchUsers } from "../utils/api";

const Perfil = () => {
	const { username } = useParams();
	const isAuth = localStorage.getItem("auth") === "true";
	const [usuario, setUsuario] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUserData = async () => {
			if (!isAuth) return;

			try {
				const users = await fetchUsers();
				const userData = users.find(user => user.username === username);
				setUsuario(userData);
			} catch (err) {
				console.error('Error al cargar usuario:', err);
			} finally {
				setLoading(false);
			}
		};

		loadUserData();
	}, [username, isAuth]);

	if (!isAuth) return <Navigate to="/login" />;
	if (loading) return <LoadingMsg />;

	return (
		<section>
			<PageHeader />
			<div className="max-w-2xl mx-auto p-4">
				<h1>¡Bienvenido, {usuario?.name?.firstname} {usuario?.name?.lastname}!</h1>
				
				<label>Nombre</label>
				<p>{usuario?.name?.firstname} {usuario?.name?.lastname}</p>

				<label>Email</label>
				<p>{usuario?.email}</p>

				<label>Teléfono</label>
				<p>{usuario?.phone}</p>

				<label>Usuario</label>
				<p>@{usuario?.username}</p>

				<label>Calle</label>
				<p>{usuario?.address?.street} {usuario?.address?.number}</p>

				<label>Ciudad</label>
				<p>{usuario?.address?.city}</p>

				<label>Código Postal</label>
				<p>{usuario?.address?.zipcode}</p>

				<label>ID de Usuario</label>
				<p>#{usuario?.id}</p>
			</div>
		</section>
	);
};

export default Perfil;