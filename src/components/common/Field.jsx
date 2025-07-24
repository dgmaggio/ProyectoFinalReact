const Field = ({
    as = "input",
    label,
    id,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    className = "",
    required = false,
    rows = 4,
    autoComplete,
    error,
    helpText,
    ...props
}) => {
    const Component = as;
    const fieldId = id || name;
    const errorId = error ? `${fieldId}-error` : undefined;
    const helpId = helpText ? `${fieldId}-help` : undefined;
    
    // Construir aria-describedby dinámicamente
    const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined;

    return (
        <div>
            {label && (
                <label
                    htmlFor={fieldId}
                    className="block mb-1 font-medium"
                >
                    {label}
                    {required && (
                        <span 
                            className="text-red-500 ml-1" 
                            aria-label="campo requerido"
                        >
                            *
                        </span>
                    )}
                </label>
            )}
            
            <Component
                id={fieldId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                rows={as === "textarea" ? rows : undefined}
                aria-required={required}
                aria-invalid={!!error}
                aria-describedby={describedBy}
                className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition ${
                    error 
                        ? 'border-red-500 focus:ring-red-400 focus:border-red-400' 
                        : 'border-zinc-300'
                } ${className}`}
                {...props}
            />
            
            {/* Texto de ayuda */}
            {helpText && (
                <div 
                    id={helpId}
                    className="mt-1 text-xs text-gray-600"
                >
                    {helpText}
                </div>
            )}
            
            {/* Mensaje de error */}
            {error && (
                <div 
                    id={errorId}
                    role="alert"
                    aria-live="polite"
                    className="mt-1 text-xs text-red-600 font-medium"
                >
                    {error}
                </div>
            )}
        </div>
    );
};

export default Field;