import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initializeAuth = () => {
			try {
				const savedToken = localStorage.getItem("token");
				const savedUser = localStorage.getItem("user");
				
				// Verificar que existan y no sean strings vacíos o 'null'
				if (savedToken && savedUser && 
					savedToken !== 'null' && savedUser !== 'null' &&
					savedToken.trim() !== '' && savedUser.trim() !== '') {
					setToken(savedToken);
					setUser(savedUser);
				}
			} catch (error) {
				console.error('Error inicializando autenticación:', error);
				// Limpiar localStorage corrupto
				localStorage.removeItem("token");
				localStorage.removeItem("user");
			} finally {
				setLoading(false);
			}
		};

		initializeAuth();
	}, []);

	// Esta función es la que usa tu Login.jsx después de validar con fetchUsers()
	const loginWithApiUser = (username) => {
		const token = "api_user_token_" + Date.now(); // Token único
		setToken(token);
		setUser(username);
		localStorage.setItem("token", token);
		localStorage.setItem("user", username);
		localStorage.setItem("auth", "true");
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("auth");
	};

	const isAuthenticated = () => {
		return !!(token && user && token !== 'null' && user !== 'null');
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				user,
				logout,
				loginWithApiUser,
				isAuthenticated,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);