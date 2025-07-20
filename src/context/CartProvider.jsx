import { useState } from 'react';
import { CartContext } from './CartContext';

// Proveedor del contexto
export const CartProvider = ({ children }) => {
	const [carrito, setCarrito] = useState([]);

	// Agregar producto al carrito
	const agregarAlCarrito = (producto, cantidad = 1) => {
		setCarrito((prevCarrito) => {
			const existe = prevCarrito.find(item => item.id === producto.id);
			if (existe) {
				// Si ya existe, aumentar la cantidad
				return prevCarrito.map(item =>
					item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
				);
			} // <- Esta llave estaba faltando
			// Si no existe, agregarlo con la cantidad especificada
			return [...prevCarrito, { ...producto, cantidad }];
		});
	};

	// Actualiza la cantidad con el stepper
	const actualizarCantidad = (productoId, nuevaCantidad) => {
		setCarrito(prevCarrito => 
		  prevCarrito.map(item =>
			item.id === productoId
			  ? { ...item, cantidad: nuevaCantidad }
			  : item
		  )
		);
	};

	// Obtener cantidad total de productos
	const cantidadTotal = () => {		
		return carrito.reduce((acc, item) => acc + item.cantidad, 0);
	};

	// Obtener precio total de la compra
	const obtenerTotal = () => {
		return carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
	};

	// Eliminar producto por ID
	const eliminarDelCarrito = (id) => {
		setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
	};

	// Vaciar el carrito
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