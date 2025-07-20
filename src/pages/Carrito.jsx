import { useContext } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from "../components/common/Button"
import Stepper from "../components/common/Stepper"
import { Link } from "react-router-dom";
import { formatPrice } from '../utils/formatPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

const Carrito = () => {
	const { carrito, eliminarDelCarrito, actualizarCantidad, obtenerTotal, cantidadTotal, vaciarCarrito } = useContext(CartContext);

	const notify = (title) => {
        toast.error(
          <>
            Se eliminó {title.slice(0, 25)}...
          </>
        );
    };

	if (carrito.length === 0) {
		return (
			<section>
				<PageHeader />

				<div className="bg-gray-100 px-4 lg:px-8 py-6 lg:py-12 border-t-1 border-gray-300">
					El carrito está vacío.
				</div>
			</section>
		)
	}

	return (
		<section>
			<PageHeader />
			
			<div className="bg-gray-100 px-4 lg:px-8 py-6 lg:py-12 border-t-1 border-gray-300">

				<div className="flex flex-col lg:flex-row gap-12">
					<div className="lg:w-2/3 border border-zinc-300 bg-white p-6 lg:p-8 rounded-xl justify-between">
						<div className="space-y-4">
						{carrito.map(item => (
							<div key={item.id} className="grid grid-cols-3 lg:grid-cols-[80px_1fr_100px_120px_100px_20px] gap-2 lg:gap-4 items-center border-b border-gray-200 pb-4 last:border-b-0">
								<div className="w-16 h-16 lg:w-20 lg:h-20">
									<img 
										src={item.image} 
										alt={item.title}
										className="w-full h-full object-contain"
									/>
								</div>

								<div className="col-span-2 lg:col-span-1">
									{item.title}
								</div>

								<div className="lg:col-span-1 text-center">
									{formatPrice(item.price)}
								</div>

								<div className="lg:col-span-1">
									<Stepper
										value={item.cantidad}
										onChange={(nuevaCantidad) => actualizarCantidad(item.id, nuevaCantidad)}
										min={1}
										max={10}
									/>
								</div>
								
								<div className="lg:col-span-1 text-center">
									{formatPrice(item.price * item.cantidad)}
								</div>

								<div className="col-span-3 lg:col-span-1">
									<button 
										onClick={() => {
											eliminarDelCarrito(item.id)											
											notify(item.title);
										}}
										className="text-red-400 hover:text-red-600 cursor-pointer"
									>
										<FontAwesomeIcon icon={faTrash} /> <span className="font-bold lg:hidden">Eliminar</span>
									</button>
								</div>
							</div>
						))}
						</div>
					</div>

					<div className="w-full lg:w-1/3">
						<div className="border border-zinc-300 bg-white p-6 lg:p-8 rounded-xl shadow-lg">
							<h2 className="text-xl font-semibold text-cyan-900 text-center pb-4 border-b border-gray-200">
							Resumen de compra
							</h2>

							<div className="space-y-4 pt-4">
							<div className="flex justify-between text-sm text-zinc-600">
								<span>Productos</span>
								<span>{cantidadTotal()}</span>
							</div>

							<div className="flex justify-between pt-4 text-base font-semibold text-zinc-800">
								<span>Total</span>
								<span className="text-lg font-bold text-cyan-950">
								{formatPrice(obtenerTotal())}
								</span>
							</div>

							<Button className="w-full text-base py-3">
								Finalizar compra
							</Button>

							<Link
								to="/productos"
								className="block text-center text-cyan-500 hover:text-cyan-950 font-medium mt-2"
							>
								Seguir comprando
							</Link>
							</div>
						</div>

						<button
							onClick={vaciarCarrito}
							className="block mx-auto mt-4 text-red-400 hover:text-red-600 font-semibold cursor-pointer"
						>
							Vaciar carrito
						</button>

					</div>
				</div>

			</div>			
		</section>
	);
};

export default Carrito;