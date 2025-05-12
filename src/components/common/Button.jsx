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
            className={`cursor-pointer font-bold bg-sky-400 text-white px-4 py-2 rounded hover:bg-sky-950 transition ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
