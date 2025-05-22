import { GridLoader } from 'react-spinners';
import { useMemo } from 'react';

const LoadingMsg = () => {
	const cyan400 = useMemo(() => '#00d3f3', []);

	return (
		<div className="flex flex-col items-center w-full bg-gray-100 px-4 lg:px-8 py-6 lg:py-12 border-t-1 border-gray-300 space-y-8">
			<GridLoader color={cyan400} size={24} />
			<p>Cargando productos...</p>
		</div>
	);
};

export default LoadingMsg;
