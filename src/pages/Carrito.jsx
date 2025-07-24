import { useContext } from 'react';
import PageHeader from '../components/common/PageHeader';
import Button from "../components/common/Button"
import Stepper from "../components/common/Stepper"
import { Link } from "react-router-dom";
import { formatPrice } from '../utils/formatPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import useToast from '../hooks/useToast';
import ConfirmationModal from '../components/common/ConfirmationModal';
import useConfirmation from '../hooks/useConfirmation';
import SEO from '../components/common/SEO';

const Carrito = () => {
	const { carrito, eliminarDelCarrito, actualizarCantidad, obtenerTotal, cantidadTotal, vaciarCarrito } = useContext(CartContext);
	
	const { notifySuccess, notifyProductRemoved } = useToast();
    const { modalProps, confirmClearCart } = useConfirmation();

	const handleVaciarCarrito = () => {
		confirmClearCart(() => {
		  vaciarCarrito();
		  notifySuccess('Carrito vaciado correctamente');
		});
	};

	const totalItems = cantidadTotal();
	const totalPrice = obtenerTotal();

	if (carrito.length === 0) {
		return (
			<>
				<SEO 
					title="Carrito Vacío"
					description="Tu carrito está vacío. Explorá nuestros productos y agregá los que más te gusten."
					keywords="carrito vacío, productos, compras online"
					url="https://react25017-diegomaggio.netlify.app/carrito"
				/>
				<section aria-labelledby="cart-title">
					<PageHeader />

					<div className="bg-gray-100 px-4 lg:px-8 py-6 lg:py-12 border-t-1 border-gray-300">
						<div 
							role="status"
							aria-live="polite"
							className="text-center"
						>
							<p>El carrito está vacío.</p>
							<Link
								to="/productos"
								className="inline-block mt-4 text-cyan-500 hover:text-cyan-950 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded"
								aria-label="Ir a ver todos los productos"
							>
								Ver productos
							</Link>
						</div>
					</div>
				</section>
			</>
		)
	}
	

	return (
		<>		
			<SEO 
				title={`Carrito (${totalItems} productos)`}
				description={`Tenés ${totalItems} productos en tu carrito por un total de ${formatPrice(totalPrice)}. Finalizá tu compra ahora.`}
				keywords="carrito, compras, checkout, finalizar compra, productos seleccionados"
                url="https://react25017-diegomaggio.netlify.app/carrito"
			/>

			<section aria-labelledby="cart-title">
				<PageHeader />
				
				<div className="bg-gray-100 px-4 lg:px-8 py-6 lg:py-12 border-t-1 border-gray-300">
					{/* Anuncio para lectores de pantalla */}
					<div 
						role="status"
						aria-live="polite"
						className="sr-only"
					>
						{totalItems} productos en el carrito, total {formatPrice(totalPrice)}
					</div>

					<div className="flex flex-col lg:flex-row gap-12">
						{/* Lista de productos */}
						<div className="lg:w-2/3 border border-zinc-300 bg-white p-6 lg:p-8 rounded-xl justify-between">
							<h2 
								id="cart-items-title"
								className="text-lg font-semibold mb-4 sr-only"
							>
								Productos en el carrito
							</h2>
							
							<div 
								role="list"
								aria-labelledby="cart-items-title"
								className="space-y-4"
							>
							{carrito.map((item, index) => (
								<article 
									key={item.id}
									role="listitem"
									aria-labelledby={`product-${item.id}-title`}
									className="grid grid-cols-3 lg:grid-cols-[80px_1fr_100px_120px_100px_20px] gap-2 lg:gap-4 items-center border-b border-gray-200 pb-4 last:border-b-0"
								>
									<div className="w-16 h-16 lg:w-20 lg:h-20">
										<img 
											src={item.image} 
											alt={`Imagen de ${item.title}`}
											className="w-full h-full object-contain"
											role="img"
										/>
									</div>

									<div className="col-span-2 lg:col-span-1">
										<h3 
											id={`product-${item.id}-title`}
											className="font-medium"
										>
											{item.title}
										</h3>
									</div>

									<div 
										className="lg:col-span-1 text-center"
										aria-label={`Precio unitario: ${formatPrice(item.price)}`}
									>
										<span className="sr-only">Precio unitario: </span>
										{formatPrice(item.price)}
									</div>

									<div className="lg:col-span-1">
										<Stepper
											value={item.cantidad}
											onChange={(nuevaCantidad) => actualizarCantidad(item.id, nuevaCantidad)}
											min={1}
											max={10}
											label="Cantidad"
											productName={item.title}
											aria-describedby={`product-${item.id}-total`}
										/>
									</div>
									
									<div 
										id={`product-${item.id}-total`}
										className="lg:col-span-1 text-center font-semibold"
										aria-label={`Subtotal: ${formatPrice(item.price * item.cantidad)}`}
									>
										<span className="sr-only">Subtotal: </span>
										{formatPrice(item.price * item.cantidad)}
									</div>

									<div className="col-span-3 lg:col-span-1">
										<button 
											onClick={() => {
												eliminarDelCarrito(item.id)											
												notifyProductRemoved(item.title);
											}}
											className="text-red-400 hover:text-red-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 rounded p-1"
											aria-label={`Eliminar ${item.title} del carrito`}
										>
											<FontAwesomeIcon 
												icon={faTrash} 
												aria-hidden="true"
											/> 
											<span className="font-bold lg:hidden ml-2">Eliminar</span>
										</button>
									</div>
								</article>
							))}
							</div>
						</div>

						{/* Resumen de compra */}
						<aside 
							className="w-full lg:w-1/3"
							aria-labelledby="cart-summary-title"
						>
							<div className="border border-zinc-300 bg-white p-6 lg:p-8 rounded-xl shadow-lg">
								<h2 
									id="cart-summary-title"
									className="text-xl font-semibold text-cyan-900 text-center pb-4 border-b border-gray-200"
								>
									Resumen de compra
								</h2>

								<div className="space-y-4 pt-4">
									<div className="flex justify-between text-sm text-zinc-600">
										<span>Productos:</span>
										<span aria-label={`${totalItems} productos`}>
											{totalItems}
										</span>
									</div>

									<div 
										className="flex justify-between pt-4 text-base font-semibold text-zinc-800"
										role="status"
										aria-live="polite"
									>
										<span>Total:</span>
										<span 
											className="text-lg font-bold text-cyan-950"
											aria-label={`Total a pagar: ${formatPrice(totalPrice)}`}
										>
											{formatPrice(totalPrice)}
										</span>
									</div>

									<Button 
										className="w-full text-base py-3"
										ariaLabel={`Finalizar compra por ${formatPrice(totalPrice)}`}
									>
										Finalizar compra
									</Button>

									<Link
										to="/productos"
										className="block text-center text-cyan-500 hover:text-cyan-950 font-medium mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded"
										aria-label="Continuar comprando más productos"
									>
										Seguir comprando
									</Link>
								</div>
							</div>

							<button
								onClick={handleVaciarCarrito}
								className="block mx-auto mt-4 text-red-400 hover:text-red-600 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 rounded p-2"
								aria-label={`Vaciar carrito completo (${totalItems} productos)`}
								aria-describedby="clear-cart-help"
							>
								Vaciar carrito
							</button>
							
							<div 
								id="clear-cart-help"
								className="sr-only"
							>
								Esta acción eliminará todos los productos del carrito
							</div>
						</aside>
					</div>
				</div>
				
				<ConfirmationModal {...modalProps} />
			</section>
		</>
	);
};

export default Carrito;