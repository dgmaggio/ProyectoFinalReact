import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
	// 📚 ESTADO: La "fuente de verdad" para saber si el usuario está logueado
	const [token, setToken] = useState(null);     // Para verificar autenticación
	const [user, setUser] = useState(null);       // Para mostrar datos del usuario
	const [loading, setLoading] = useState(true); // Para evitar redirects prematuros

	// 🔄 INICIALIZACIÓN: Al cargar la app, recuperar sesión guardada
	useEffect(() => {
		const initializeAuth = () => {
			try {
				// Leer datos guardados del navegador
				const savedToken = localStorage.getItem("token");
				const savedUser = localStorage.getItem("user");
				
				// ✅ VERIFICACIÓN ROBUSTA: Asegurar que los datos existan y sean válidos
				if (savedToken && savedUser && 
					savedToken !== 'null' && savedUser !== 'null' &&
					savedToken.trim() !== '' && savedUser.trim() !== '') {
					
					// Restaurar el estado de la sesión
					setToken(savedToken);
					setUser(savedUser);
					console.log('✅ Sesión restaurada para:', savedUser);
				} else {
					console.log('❌ No hay sesión guardada o datos inválidos');
				}
			} catch (error) {
				console.error('❌ Error leyendo localStorage:', error);
				// 🧹 LIMPIEZA: Si hay datos corruptos, eliminarlos
				localStorage.removeItem("token");
				localStorage.removeItem("user");
			} finally {
				// ⚠️ IMPORTANTE: Siempre marcar como "terminado de cargar"
				setLoading(false);
			}
		};

		initializeAuth();
	}, []);

	// 🔐 LOGIN: Cuando el usuario se autentica exitosamente
	const loginWithApiUser = (username) => {
		// Generar un token único para esta sesión
		const authToken = `user_${username}_${Date.now()}`;
		
		// 📝 ACTUALIZAR ESTADO: Esta es la "fuente de verdad"
		setToken(authToken);
		setUser(username);
		
		// 💾 PERSISTIR: Guardar en localStorage para mantener sesión entre recargas
		localStorage.setItem("token", authToken);
		localStorage.setItem("user", username);
		
		console.log('✅ Usuario logueado:', username);
	};

	// 🚪 LOGOUT: Limpiar completamente la sesión
	const logout = () => {
		// 🧹 LIMPIAR ESTADO
		setToken(null);
		setUser(null);
		
		// 🧹 LIMPIAR PERSISTENCIA
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		
		console.log('✅ Sesión cerrada');
	};

	// ✅ VERIFICACIÓN: ¿El usuario está autenticado?
	const isAuthenticated = () => {
		// 🎯 BUENA PRÁCTICA: Verificar el ESTADO, no localStorage directamente
		// Esto es más rápido y es la "fuente de verdad"
		const hasValidSession = !!(token && user && token !== 'null' && user !== 'null');
		
		console.log('🔍 Verificando autenticación:', {
			token: !!token,
			user: !!user,
			result: hasValidSession
		});
		
		return hasValidSession;
	};

	// 📡 PROVIDER: Compartir funciones y estado con toda la app
	return (
		<AuthContext.Provider
			value={{
				// 📊 ESTADO
				token,      // Para verificaciones adicionales si se necesitan
				user,       // Para mostrar nombre de usuario, perfil, etc.
				loading,    // Para que PrivateRoute sepa cuándo puede verificar
				
				// 🔧 FUNCIONES
				loginWithApiUser,  // Para Login.jsx
				logout,           // Para botones de cerrar sesión
				isAuthenticated,  // Para PrivateRoute y verificaciones
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);