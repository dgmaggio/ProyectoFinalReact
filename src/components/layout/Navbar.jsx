import { useState, useRef, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/react.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars, faCartShopping, faUser, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthProvider';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const { cantidadTotal } = useContext(CartContext);
    const { user, isAuthenticated, logout } = useAuth();

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handleLogout = () => {
        if (isMenuOpen) setIsMenuOpen(false);
        logout();
        
        // Usar window.location en lugar de navigate para evitar React Router
        window.location.href = '/';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Manejar teclas del menú móvil
    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            setIsMenuOpen(false);
            buttonRef.current?.focus(); // Volver el focus al botón
        }
    };

    // Cierra el menú si se hace click fuera del menú y del botón
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    const totalItems = cantidadTotal();

    return (
        <nav 
            className="sticky z-50 flex flex-wrap items-center justify-between"
            role="navigation"
            aria-label="Navegación principal"
        >
            <div className="flex items-center space-x-4 lg:space-x-0 lg:w-1/4">
                {/* Botón hamburguesa */}
                <button
                    className="lg:hidden w-6 h-6 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded"
                    onClick={toggleMenu}
                    ref={buttonRef}
                    aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-haspopup="true"
                >
                    <FontAwesomeIcon 
                        icon={isMenuOpen ? faXmark : faBars}
                        aria-hidden="true"
                    />
                </button>

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded"
                    aria-label="Ir a la página de inicio - Proyecto Final"
                >
                    <img 
                        src={logo}
                        alt="Logo de Proyecto Final" 
                    />
                    <span className="text-lg font-bold">Proyecto Final</span>
                </Link>
            </div>

            {/* Menú de navegación */}
            <div
                id="mobile-menu"
                ref={menuRef}
                className={`${
                    isMenuOpen
                    ? 'fixed z-40 top-16 left-0 right-0 bottom-0 bg-cyan-950 flex'
                      : 'hidden'
                  } w-full lg:static lg:w-auto flex-col lg:flex lg:flex-row lg:items-center lg:space-x-4 p-4 pt-0 lg:p-0`}
                role={isMenuOpen ? "menu" : undefined}
                aria-hidden={!isMenuOpen ? "true" : "false"}
            >
                <NavLink
                    to="/productos"
                    className={({ isActive }) =>
                        `font-bold py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${isActive ? 'text-white' : 'text-cyan-500 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    Productos
                </NavLink>

                <NavLink
                    to="/novedades"
                    className={({ isActive }) =>
                        `font-bold py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${isActive ? 'text-white' : 'text-cyan-500 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    Novedades
                </NavLink>

                <NavLink
                    to="/ofertas"
                    className={({ isActive }) =>
                        `font-bold py-2 border-b-1 lg:border-0 border-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${isActive ? 'text-white' : 'text-cyan-500 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    Ofertas
                </NavLink>

                <NavLink
                    to="/nosotros"
                    className={({ isActive }) =>
                        `font-bold py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${isActive ? 'text-white' : 'text-cyan-500 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    Nosotros
                </NavLink>

                <NavLink
                    to="/contacto"
                    className={({ isActive }) =>
                        `font-bold py-2 lg:hidden border-b-1 border-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${isActive ? 'text-white' : 'text-cyan-500 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    Contacto
                </NavLink>

                {!isAuthenticated() ? (
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `font-bold py-2 lg:hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${isActive ? 'text-white' : 'text-cyan-500 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                    Ingresar
                </NavLink>
                ) : (
                <>
                <NavLink
                    to={`/perfil/${user}`}
                    className={({ isActive }) =>
                        `font-bold py-2 lg:hidden capitalize focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${isActive ? 'text-white' : 'text-cyan-500 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    aria-current={({ isActive }) => isActive ? "page" : undefined}
                    aria-label={`Ir al perfil de ${user}`}
                >
                    {user}
                </NavLink>
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            `font-bold py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${isActive ? 'text-white' : 'text-cyan-500 hover:text-white'}`
                        }
                        onClick={() => setIsMenuOpen(false)}
                        role="menuitem"
                        aria-current={({ isActive }) => isActive ? "page" : undefined}
                    >
                        Administración
                    </NavLink>

                <button
                    onClick={handleLogout}
                    className="font-bold py-2 lg:hidden text-left text-cyan-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded"
                    role="menuitem"
                    aria-label="Cerrar sesión y salir de la cuenta"
                >
                    Salir
                </button>
                </>
                )}
            </div>

            {/* Login + Carrito */}
            <div className="flex justify-end w-1/4 space-x-4">
            
                {!isAuthenticated() ? (
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `hidden lg:inline-block space-x-0 lg:space-x-1 flex items-center font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${!isActive ? 'text-cyan-500 hover:text-white' : ''}`
                    }
                    aria-label="Iniciar sesión en tu cuenta"
                >
                    <FontAwesomeIcon
                        icon={faRightToBracket}
                        className="w-6 h-6"
                        aria-hidden="true"
                    />
                    <span>Ingresar</span>
                </NavLink>
                ) : (
                <>  
                    <NavLink
                        to={`/perfil/${user}`}
                        className={({ isActive }) =>
                            `hidden lg:inline-block space-x-0 lg:space-x-1 flex items-center font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${!isActive ? 'text-cyan-500 hover:text-white' : ''}`
                        }
                        aria-label={`Ver perfil de ${user}`}
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            className="w-6 h-6"
                            aria-hidden="true"
                        />
                        <span className="hidden lg:inline-block capitalize">{user}</span>
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="hidden lg:inline-block space-x-0 lg:space-x-1 flex items-center font-bold text-cyan-500 hover:text-white bg-transparent border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded"
                        aria-label="Cerrar sesión y salir de la cuenta"
                    >
                        <FontAwesomeIcon 
                            icon={faRightFromBracket} 
                            className="w-6 h-6"
                            aria-hidden="true"
                        />
                        <span className="hidden lg:inline-block">Salir</span>
                    </button>
                </>
                )}

                <NavLink
                    to="/carrito"
                    className="space-x-1 flex items-center font-bold text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded"
                    aria-label={totalItems > 0 ? `Ir al carrito de compras, ${totalItems} productos` : "Ir al carrito de compras (vacío)"}
                >
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        className="w-6 h-6"
                        aria-hidden="true"
                    />
                    
                    {totalItems > 0 && (
                    <span 
                        className="font-bold"
                        aria-label={`${totalItems} productos en el carrito`}
                    >
                        {totalItems}
                    </span>
                    )}
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;