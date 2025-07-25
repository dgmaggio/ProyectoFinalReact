import React from 'react';

const Stepper = ({
    value,
    onChange,
    min = 1,
    max = 10,
    step = 1,
    className = '',
    label = 'Cantidad',
    productName,
    ...props
}) => {
    const handleIncrement = () => {
        const newValue = Number(value) + step;
        if (max === undefined || newValue <= max) {
            onChange(newValue);
        }
    };

    const handleDecrement = () => {
        const newValue = Number(value) - step;
        if (min === undefined || newValue >= min) {
            onChange(newValue);
        }
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value) || min;
        const clampedValue = Math.max(min, Math.min(max, newValue));
        onChange(clampedValue);
    };

    const currentValue = Number(value);
    const canIncrement = max === undefined || currentValue < max;
    const canDecrement = min === undefined || currentValue > min;
    
    const groupLabel = productName ? `${label} para ${productName}` : label;
    const inputId = `stepper-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div 
            className={`flex items-center gap-2 border border-zinc-300 rounded ${className}`}
            role="group"
            aria-labelledby={`${inputId}-label`}
            {...props}
        >
            {/* Label invisible para lectores de pantalla */}
            <span 
                id={`${inputId}-label`}
                className="sr-only"
            >
                {groupLabel}
            </span>
            
            <button
                type="button"
                onClick={handleDecrement}
                disabled={!canDecrement}
                aria-label={`Disminuir ${label.toLowerCase()}${productName ? ` de ${productName}` : ''}`}
                className={`w-8 h-8 flex items-center justify-center text-2xl font-bold transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-inset ${
                    canDecrement 
                        ? 'text-cyan-400 hover:text-cyan-600 cursor-pointer' 
                        : 'text-gray-400 cursor-not-allowed'
                }`}
            >
                -
            </button>
            
			<span 
				className="px-3 py-1 w-10 text-center font-medium"
				aria-live="polite"
				aria-label={`${label}: ${value}`}
			>
				{value}
			</span>
            
            <button
                type="button"
                onClick={handleIncrement}
                disabled={!canIncrement}
                aria-label={`Aumentar ${label.toLowerCase()}${productName ? ` de ${productName}` : ''}`}
                className={`w-8 h-8 flex items-center justify-center text-2xl font-bold transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-inset ${
                    canIncrement
                        ? 'text-cyan-400 hover:text-cyan-600 cursor-pointer' 
                        : 'text-gray-400 cursor-not-allowed'
                }`}
            >
                +
            </button>
        </div>
    );
};

export default Stepper;