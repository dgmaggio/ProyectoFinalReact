import { Link } from 'react-router-dom';

const ButtonLink = ({ 
    to,
    children,
    className = ''
}) => {
    return (
        <Link
            to={to}
            className={`text-sm font-semibold tracking-wider uppercase tracking-wide uppercase text-center bg-cyan-500 text-white px-4 py-3 rounded hover:bg-cyan-950 transition ${className}`}
        >
            {children}
        </Link>
    );
};

export default ButtonLink;