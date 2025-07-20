const Button = ({ 
    children,
    onClick, 
    className = '', 
    type = 'submit'
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`text-sm font-semibold tracking-wider uppercase cursor-pointer bg-cyan-500 text-white px-4 py-3 rounded hover:bg-cyan-950 transition ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
