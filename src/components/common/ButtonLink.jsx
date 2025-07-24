import { Link } from 'react-router-dom';

const ButtonLink = ({ 
    to,
    children,
    className = '',
    ariaLabel,
    ariaDescribedBy,
    ...props
}) => {
    return (
        <Link
            to={to}
            role="button"
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            className={`inline-block text-sm font-semibold tracking-wider uppercase tracking-wide uppercase text-center bg-cyan-500 text-white px-4 py-3 rounded hover:bg-cyan-950 transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
};

export default ButtonLink;
