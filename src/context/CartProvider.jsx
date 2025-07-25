import { useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
	const [carrito, setCarrito] = useState([]);

	const agregarAlCarrito = (producto, cantidad = 1) => {
		setCarrito((prevCarrito) => {
			const existe = prevCarrito.find(item => item.id === producto.id);
			if (existe) {
				return prevCarrito.map(item =>
					item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
				);
			}
			return [...prevCarrito, { ...producto, cantidad }];
		});
	};

	const actualizarCantidad = (productoId, nuevaCantidad) => {
		setCarrito(prevCarrito => 
		  prevCarrito.map(item =>
			item.id === productoId
			  ? { ...item, cantidad: nuevaCantidad }
			  : item
		  )
		);
	};

	const cantidadTotal = () => {		
		return carrito.reduce((acc, item) => acc + item.cantidad, 0);
	};

	const obtenerTotal = () => {
		return carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
	};

	const eliminarDelCarrito = (id) => {
		setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
	};

	const vaciarCarrito = () => {
		setCarrito([]);
	};

	return (
		<CartContext.Provider
			value={{
				carrito,
				setCarrito,
				agregarAlCarrito,
				actualizarCantidad,
				eliminarDelCarrito,
				vaciarCarrito,
				obtenerTotal,
				cantidadTotal
			}}
		>
			{children}
		</CartContext.Provider>
	);
};