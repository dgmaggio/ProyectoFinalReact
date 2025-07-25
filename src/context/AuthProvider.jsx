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
				
				if (savedToken && savedUser && 
					savedToken !== 'null' && savedUser !== 'null' &&
					savedToken.trim() !== '' && savedUser.trim() !== '') {
				
					setToken(savedToken);
					setUser(savedUser);
				}
			} catch (error) {
				console.error('Error leyendo localStorage:', error);
				localStorage.removeItem("token");
				localStorage.removeItem("user");
			} finally {
				setLoading(false);
			}
		};

		initializeAuth();
	}, []);

	const loginWithApiUser = (username) => {
		const authToken = `user_${username}_${Date.now()}`;

		setToken(authToken);
		setUser(username);

		localStorage.setItem("token", authToken);
		localStorage.setItem("user", username);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	};

	const isAuthenticated = () => {
		const hasValidSession = !!(token && user && token !== 'null' && user !== 'null');		
		
		return hasValidSession;
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				user, 
				loading,
				
				loginWithApiUser,
				logout,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);