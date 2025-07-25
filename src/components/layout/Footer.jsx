import { Link } from 'react-router-dom';

const Footer = () => {
    const token = localStorage.getItem('token');
    const isAuth = !!token;
    const username = localStorage.getItem('user');

    return (
        <>
            <footer className="border-t-1 border-gray-300 text-sm">
                <div className="flex flex-col sm:flex-row justify-between p-4 lg:p-8">
                    <div className="flex space-x-24 sm:m-0 mb-4">
                        <div>
                            <div
                                className="font-bold mb-2 text-cyan-950"
                            >
                                Proyecto Final
                            </div>
                
                            <ul className="flex flex-col space-y-1">
                                <li>                        
                                    <Link
                                        to="/"
                                        className="alink"
                                    >
                                        Inicio
                                    </Link>
                                </li>

                                <li>                        
                                    <Link
                                        to="/nosotros"
                                        className="alink"
                                    >
                                        Nosotros
                                    </Link>
                                </li>

                                <li>                        
                                    <Link
                                        to="/contacto"
                                        className="alink"
                                    >
                                        Contacto
                                    </Link>
                                </li>

                                {isAuth && (
                                <>
                                    <li>                        
                                        <Link
                                            to={`/perfil/${username}`}
                                            className="alink"
                                        >
                                            Perfil
                                        </Link>
                                    </li>
                                    

                                    <li>                        
                                        <Link
                                            to="/admin"
                                            className="alink"
                                        >
                                            Administración
                                        </Link>
                                    </li>
                                </>

                                )}
                            </ul>
                        </div>

                        <div>
                            <div
                                className="font-bold mb-2 text-cyan-950"
                            >
                                Tienda
                            </div>

                            <ul className="flex flex-col space-y-1">
                                <li>                        
                                    <Link
                                        to="/productos"
                                        className="alink"
                                    >
                                        Productos
                                    </Link>
                                </li>
                                
                                <li>                        
                                    <Link
                                        to="/novedades"
                                        className="alink"
                                    >
                                        Novedades
                                    </Link>
                                </li>
                                
                                <li>                        
                                    <Link
                                        to="/ofertas"
                                        className="alink"
                                    >
                                        Ofertas
                                    </Link>
                                </li>

                                <li>                        
                                    <Link
                                        to="/carrito"
                                        className="alink"
                                    >
                                        Carrito
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="sm:m-0 text-xs">
                        <p className="mb-2">
                            © 2025 Proyecto Final<br/>
                            Todos los derechos reservados
                        </p>

                        <p>
                            Diseño y Desarrollo:<br/>
                            <Link
                                to="https://www.linkedin.com/in/dgmaggio/"
                                className="alink"
                            >
                                Diego Maggio
                            </Link>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;