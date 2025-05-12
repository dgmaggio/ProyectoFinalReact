import { Link, useLocation } from 'react-router-dom';

const PageHeader = ({ title = '' }) => {
    const location = useLocation();
    const path = location.pathname;

    const centrarTitulo = !["/", "/productos", "/novedades", "/ofertas"].includes(path);

    const segments = location.pathname
        .split('/')
        .filter(Boolean); // elimina los vacíos por el primer '/'

    const pathLinks = segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        return {
            label: segment.charAt(0).toUpperCase() + segment.slice(1),
            path
        };
    });

    return (
        <div className={`p-4 lg:p-8 mx-auto ${centrarTitulo ? 'lg:w-1/2 !lg:px-0' : ''}`}>
            <nav className="text-sm text-zinc-400 mb-2">
                <Link to="/" className="font-bold hover:text-sky-950 text-sky-400">Inicio</Link>
                {pathLinks.map((item, index) => (
                    <span key={index}>
                        <span className="mx-1"> / </span>
                        {index === pathLinks.length - 1 ? (
                            <span className="text-zinc-500">{item.label}</span>
                        ) : (
                            <Link to={item.path} className="font-bold hover:text-sky-950 text-sky-400">{item.label}</Link>
                        )}
                    </span>
                ))}
            </nav>
            <h1 className="text-3xl font-bold text-sky-950">
                {title || (pathLinks.at(-1)?.label ?? 'Página')}
            </h1>
        </div>
    );
};

export default PageHeader;