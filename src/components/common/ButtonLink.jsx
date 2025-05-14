import { Link } from 'react-router-dom';

const ButtonLink = ({ 
    to,
    children,
    className = ''
}) => {
    return (
        <Link
            to={to}
            className={`font-bold bg-sky-400 text-white px-4 py-2 rounded hover:bg-sky-950 transition ${className}`}
        >
            {children}
        </Link>
    );
};

export default ButtonLink;