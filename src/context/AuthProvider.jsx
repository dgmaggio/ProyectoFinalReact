import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(savedUser);
        }
    }, []);

    // Nueva función que acepta cualquier usuario válido de la API
    const loginWithApiUser = (username) => {
        const tokenFalso = "dG9rZW5GYWxzbzEyMzQ=";
        setToken(tokenFalso);
        setUser(username);
        localStorage.setItem("token", tokenFalso);
        localStorage.setItem("user", username);
    };

    // Mantenemos la función login original por si acaso
    const login = (username, password) => {
        if (username === "admin" && password === "1234") {
            const tokenFalso = "dG9rZW5GYWxzbzEyMzQ=";
            setToken(tokenFalso);
            setUser(username);
            localStorage.setItem("token", tokenFalso);
            localStorage.setItem("user", username);
            return true;
        }
        return false;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const isAuthenticated = () => {
        return token !== null && user !== null;
    };

    return (
        <AuthContext.Provider value={{ token, user, login, loginWithApiUser, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);