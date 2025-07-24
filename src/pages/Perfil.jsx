import { useState, useEffect } from 'react';
import { useParams, Navigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import LoadingMsg from "../components/common/LoadingMsg";
import { fetchUsers } from "../utils/api";
import { useAuth } from "../context/AuthProvider";
import SEO from '../components/common/SEO';

const Perfil = () => {
	const { username } = useParams();
	const { isAuthenticated, loading: authLoading } = useAuth();
	const [usuario, setUsuario] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUserData = async () => {
			if (!isAuthenticated()) return;

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
		
		if (!authLoading) {
			loadUserData();
		}
	}, [username, isAuthenticated, authLoading]); 
	
	if (authLoading) return <LoadingMsg />;
	
	if (!isAuthenticated()) return <Navigate to="/login" />;
	
	if (loading) return <LoadingMsg />;

	return (
		<>
			<SEO 
				title={`${usuario?.name?.firstname} ${usuario?.name?.lastname} - Mi Perfil`}
				description={`Perfil personal de ${usuario?.name?.firstname}. Email: ${usuario?.email}. Miembro desde ${new Date().getFullYear()}.`}
				// ...
			/>
			
			<section>
				<PageHeader />

				<div className="lg:w-1/2 mx-auto px-4 lg:px-8 pb-6 lg:pb-12 flex flex-col gap-4">
					<div className='flex gap-2'>
						<label className='font-bold inline-block w-28'>Nombre</label>
						<span className='capitalize'>{usuario?.name?.firstname} {usuario?.name?.lastname}</span>
					</div>
					<div className='flex gap-2'>
						<label className='font-bold inline-block w-28'>Email</label>
						<p>{usuario?.email}</p>
					</div>

					<div className='flex gap-2'>
						<label className='font-bold inline-block w-28'>Teléfono</label>
						<p>{usuario?.phone}</p>
					</div>

					<div className='flex gap-2'>
						<label className='font-bold inline-block w-28'>Usuario</label>
						<p>@{usuario?.username}</p>
					</div>

					<div className='flex gap-2'>
						<label className='font-bold inline-block w-28'>Calle</label>
						<p>{usuario?.address?.street} {usuario?.address?.number}</p>
					</div>

					<div className='flex gap-2'>
						<label className='font-bold inline-block w-28'>Ciudad</label>
						<p>{usuario?.address?.city}</p>
					</div>

					<div className='flex gap-2'>
						<label className='font-bold inline-block w-28'>Código Postal</label>
						<p>{usuario?.address?.zipcode}</p>
					</div>

				</div>
			</section>
			
		</>
	);
};

export default Perfil;