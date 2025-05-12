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
        <nav className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4 lg:space-x-0 lg:w-1/4">
                {/* Botón hamburguesa */}
                <button
                    className="lg:hidden w-4"
                    onClick={toggleMenu}
                    ref={buttonRef}
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
                    isMenuOpen ? 'fixed top-16 left-0 right-0  bg-sky-950 z-50 flex' : 'hidden'
                } w-full lg:static lg:w-auto flex-col lg:flex lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 p-4 lg:p-0`}
            >
                <NavLink
                    to="/productos"
                    className={({ isActive }) =>
                        `font-bold ${!isActive ? 'text-sky-400 hover:text-white' : ''}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Productos
                </NavLink>

                <NavLink
                    to="/novedades"
                    className={({ isActive }) =>
                        `font-bold ${!isActive ? 'text-sky-400 hover:text-white' : ''}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Novedades
                </NavLink>

                <NavLink
                    to="/ofertas"
                    className={({ isActive }) =>
                        `font-bold ${!isActive ? 'text-sky-400 hover:text-white' : ''}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Ofertas
                </NavLink>
            </div>

            {/* Login + Carrito */}
            <div className="flex justify-end w-1/4 space-x-4">
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `space-x-0 lg:space-x-2 flex items-center font-bold ${!isActive ? 'text-sky-500 hover:text-sky-400' : ''}`
                    }
                >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="hidden lg:inline-block">Administración</span>
                </NavLink>

                <NavLink
                    to="/carrito"
                    className={({ isActive }) =>
                        `space-x-0 lg:space-x-2 flex items-center font-bold ${!isActive ? 'text-sky-500 hover:text-sky-400' : ''}`
                    }
                >
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="hidden lg:inline-block">Carrito</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
