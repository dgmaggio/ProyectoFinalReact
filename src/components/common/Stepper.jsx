import React from 'react';

const Stepper = ({
	value,
	onChange,
	min = 1,
	max = 10,
	step = 1,
	className = '',
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

	const currentValue = Number(value);
	const canIncrement = max === undefined || currentValue < max;
	const canDecrement = min === undefined || currentValue > min;

	return (
		<div className={`flex items-center gap-2 border border-zinc-300 rounded ${className}`}>
			<button
				type="button"
				onClick={handleDecrement}
				disabled={!canDecrement}
				className={`w-8 h-8 flex items-center justify-center text-2xl font-bold cursor-pointer ${
					canDecrement 
						? 'text-cyan-400' 
						: 'text-gray-400'
				}`}
			>
				−
			</button>
			
			<span className="px-3 py-1 w-10 text-center font-medium">
				{value}
			</span>
			
			<button
				type="button"
				onClick={handleIncrement}
				disabled={!canIncrement}
				className={`w-8 h-8 flex items-center justify-center text-2xl font-bold cursor-pointer ${
					canIncrement
						? 'text-cyan-400' 
						: 'text-gray-400'
				}`}
			>
				+
			</button>
		</div>
	);
};

export default Stepper;