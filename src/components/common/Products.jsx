import { useEffect, useState, useContext } from 'react';
import Card from '../common/Card';
import PageHeader from '../common/PageHeader';
import LoadingMsg from '../common/LoadingMsg';
import { fetchProducts } from '../../utils/api';
import { CartContext } from '../../context/CartContext';

const Products = ({ category }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            
            // Crear clave única para localStorage basada en categoría
            const storageKey = category ? `products_${category}` : 'products_all';
            
            try {
                // Intentar obtener productos del localStorage
                const storedProducts = localStorage.getItem(storageKey);
                
                if (storedProducts) {
                    // Si existen en localStorage, usarlos directamente
                    const parsedProducts = JSON.parse(storedProducts);
                    setProductos(parsedProducts);
                    setLoading(false);
                    console.log(`Productos cargados desde localStorage (${storageKey})`);
                } else {
                    // Si no existen, obtener de la API
                    console.log(`Obteniendo productos de la API (${storageKey})`);
                    const data = await fetchProducts(category);
                    
                    // Guardar en localStorage
                    localStorage.setItem(storageKey, JSON.stringify(data));
                    
                    setProductos(data);
                    setLoading(false);
                    console.log(`Productos guardados en localStorage (${storageKey})`);
                }
            } catch (err) {
                console.error("Error al cargar productos:", err);
                
                // En caso de error, intentar cargar desde localStorage como fallback
                const storedProducts = localStorage.getItem(storageKey);
                if (storedProducts) {
                    const parsedProducts = JSON.parse(storedProducts);
                    setProductos(parsedProducts);
                    console.log("Usando productos del localStorage como fallback");
                } else {
                    setProductos([]);
                }
                
                setLoading(false);
            }
        };

        loadProducts();
    }, [category]);

    // Función para limpiar cache (opcional - para testing o actualizar datos)
    const clearCache = () => {
        const storageKey = category ? `products_${category}` : 'products_all';
        localStorage.removeItem(storageKey);
        console.log(`Cache limpiado para ${storageKey}`);
        
        // Recargar productos desde API
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts(category);
                localStorage.setItem(storageKey, JSON.stringify(data));
                setProductos(data);
            } catch (err) {
                console.error("Error al recargar productos:", err);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    };

    return (
        <section>
            <PageHeader />

            {loading ? (
                <LoadingMsg />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4 bg-gray-100 px-4 lg:px-8 py-6 lg:py-12 border-t-1 border-gray-300">
                    {productos.map((producto) => (
                        <Card key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />
                    ))}
                </div>
            )}
        </section>
    );
};

// Valor por defecto para la prop category
Products.defaultProps = {
    category: null
};

export default Products;