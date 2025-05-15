import { Link } from 'react-router-dom';

const ButtonLink = ({ 
    to,
    children,
    className = ''
}) => {
    return (
        <Link
            to={to}
            className={`font-bold bg-cyan-400 text-white px-4 py-2 rounded hover:bg-cyan-950 transition ${className}`}
        >
            {children}
        </Link>
    );
};

export default ButtonLink;