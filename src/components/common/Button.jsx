const Button = ({ 
    children,
    onClick, 
    className = '', 
    type = 'submit',
    disabled = false,
    ariaLabel,
    ariaDescribedBy,
    ariaPressed, // Para botones toggle
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-pressed={ariaPressed}
            aria-disabled={disabled}
            className={`text-sm font-semibold tracking-wider uppercase cursor-pointer bg-cyan-500 text-white px-4 py-3 rounded hover:bg-cyan-950 transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyan-500 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;