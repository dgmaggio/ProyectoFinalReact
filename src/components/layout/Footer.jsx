import React from 'react';
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
        <footer className="border-t-1 border-gray-300 text-sm">
            <div className="flex flex-col sm:flex-row justify-between p-4 lg:p-8">
                <div className="flex space-x-8 sm:space-x-24 mx-auto sm:m-0 mb-4">
                    <div>
                        <div
                            className="font-bold mb-2"
                        >
                            Proyecto Final
                        </div>
            
                        <ul className="flex flex-col space-y-1">
                            <li>                        
                                <NavLink
                                    to="/productos"
                                    className="alink"
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>                        
                                <NavLink
                                    to="/nosotros"
                                    className="alink"
                                >
                                    Nosotros
                                </NavLink>
                            </li>

                            <li>                        
                                <NavLink
                                    to="/contacto"
                                    className="alink"
                                >
                                    Contacto
                                </NavLink>
                            </li>

                            <li>                        
                                <NavLink
                                    to="/login"
                                    className="alink"
                                >
                                    Administración
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div
                            className="font-bold mb-2"
                        >
                            Tienda
                        </div>

                        <ul className="flex flex-col space-y-1">
                            <li>                        
                                <NavLink
                                    to="/productos"
                                    className="alink"
                                >
                                    Productos
                                </NavLink>
                            </li>
                            
                            <li>                        
                                <NavLink
                                    to="/novedades"
                                    className="alink"
                                >
                                    Novedades
                                </NavLink>
                            </li>
                            
                            <li>                        
                                <NavLink
                                    to="/ofertas"
                                    className="alink"
                                >
                                    Ofertas
                                </NavLink>
                            </li>

                            <li>                        
                                <NavLink
                                    to="/carrito"
                                    className="alink"
                                >
                                    Carrito
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mx-auto sm:m-0 text-center sm:text-start text-xs">
                    <p className="mb-2">
                        © 2025 Proyecto Final<br/>
                        Todos los derechos reservados.
                    </p>

                    <p>
                        Diseño y Desarrollo:<br/>
                        Diego Maggio
                    </p>
                </div>
            </div>
        </footer>
    </>
  );
};

export default Footer;