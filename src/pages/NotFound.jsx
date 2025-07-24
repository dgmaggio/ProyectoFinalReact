import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/common/SEO';

const NotFound = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <>
            <SEO 
                title="Página no encontrada - Error 404"
                description="¿Te perdiste? No encontramos esta página. Visitá nuestro catálogo de productos o contactanos si necesitás ayuda."
            />
        
            <section>
                <div className="flex flex-col space-y-6 items-center justify-center lg:w-1/2 mx-auto px-4 lg:px-8 p-6 lg:p-12 h-64 lg:h-96">
                    <span className="text-3xl font-bold text-cyan-950 text-center">
                    {`Parece que "${
                    path.slice(1).length > 14
                        ? `${path.slice(1, 16)}...`
                        : path.slice(1)
                    }" no existe`}
                    </span>
                    <Link
                        to="/"
                        className="alink"
                    >
                        Volver al inicio
                    </Link>
                    
                </div>
            </section>
        </>
    );
};

export default NotFound;