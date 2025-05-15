import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/react.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null); // 🆕 ref para el botón

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="sticky z-50 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4 lg:space-x-0 lg:w-1/4">
                {/* Botón hamburguesa */}
                <button
                    className="lg:hidden w-6 h-6"
                    onClick={toggleMenu}
                    ref={buttonRef}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                </button>

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center space-x-2"
                >
                    <img src={logo} alt="Logo" />
                    <span className="text-lg font-bold">Proyecto Final</span>
                </Link>
            </div>

            {/* Menú de navegación */}
            <div
                ref={menuRef}
                className={`${
                    isMenuOpen
                    ? 'fixed z-40 top-16 left-0 right-0 bottom-0 bg-cyan-950 flex'
                      : 'hidden'
                  } w-full lg:static lg:w-auto flex-col lg:flex lg:flex-row lg:items-center lg:space-x-4 p-4 pt-0 lg:p-0`}
                  
            >
                <NavLink
                    to="/productos"
                    className={({ isActive }) =>
                        `font-bold py-2 ${isActive ? 'text-white' : 'text-cyan-400 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Productos
                </NavLink>

                <NavLink
                    to="/novedades"
                    className={({ isActive }) =>
                        `font-bold py-2 ${isActive ? 'text-white' : 'text-cyan-400 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Novedades
                </NavLink>

                <NavLink
                    to="/ofertas"
                    className={({ isActive }) =>
                        `font-bold py-2 ${isActive ? 'text-white' : 'text-cyan-400 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Ofertas
                </NavLink>

                <NavLink
                    to="/carrito"
                    className={({ isActive }) =>
                        `font-bold py-2 lg:hidden border-b-1 border-cyan-900 ${isActive ? 'text-white' : 'text-cyan-400 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Carrito
                </NavLink>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `font-bold py-2 lg:hidden ${isActive ? 'text-white' : 'text-cyan-400 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Inicio
                </NavLink>

                <NavLink
                    to="/nosotros"
                    className={({ isActive }) =>
                        `font-bold py-2 lg:hidden ${isActive ? 'text-white' : 'text-cyan-400 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Nosotros
                </NavLink>

                <NavLink
                    to="/contacto"
                    className={({ isActive }) =>
                        `font-bold py-2 lg:hidden border-b-1 border-cyan-900 ${isActive ? 'text-white' : 'text-cyan-400 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Contacto
                </NavLink>

                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `font-bold py-2 lg:hidden ${isActive ? 'text-white' : 'text-cyan-400 hover:text-white'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Administración
                </NavLink>
            </div>

            {/* Login + Carrito */}
            <div className="flex justify-end w-1/4 space-x-4">
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `space-x-0 lg:space-x-2 flex items-center font-bold ${!isActive ? 'text-cyan-400 hover:text-white' : ''}`
                    }
                >
                    <FontAwesomeIcon
                        icon={faUser}
                        className="w-6 h-6" 
                    />
                    <span className="hidden lg:inline-block">Administración</span>
                </NavLink>

                <NavLink
                    to="/carrito"
                    className={({ isActive }) =>
                        `space-x-0 lg:space-x-2 flex items-center font-bold ${!isActive ? 'text-cyan-400 hover:text-white' : ''}`
                    }
                >
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        className="w-6 h-6"
                    />
                    <span className="hidden lg:inline-block">Carrito</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
