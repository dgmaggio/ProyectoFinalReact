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
    required,
    rows = 4,
	autoComplete,
}) => {
    const Component = as;

    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={id || name}
                    className="block mb-1"
                >
                    {label}
                </label>
            )}
            <Component
                id={id || name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
				autoComplete={autoComplete}
                rows={as === "textarea" ? rows : undefined}
                className={`w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 ${className}`}
            />
        </div>
    );
};

export default Field;