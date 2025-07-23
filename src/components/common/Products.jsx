import { useEffect, useState, useContext } from 'react';
import Card from '../common/Card';
import PageHeader from '../common/PageHeader';
import LoadingMsg from '../common/LoadingMsg';
import { fetchProducts } from '../../utils/api';
import { CartContext } from '../../context/CartContext';

const Products = ({ category }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError('');
            
            try {
                // Usar directamente fetchProducts que ya tiene cache incluido
                const data = await fetchProducts(category);
                setProductos(data);
                console.log(`${data.length} productos cargados${category ? ` (categoría: ${category})` : ''}`);
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError('Error al cargar productos');
                setProductos([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [category]);

    if (loading) {
        return (
            <section>
                <PageHeader />
                <LoadingMsg />
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <PageHeader />
                <div className="text-center py-8">
                    <p className="text-red-500">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Reintentar
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section>
            <PageHeader />
            <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4 bg-gray-100 px-4 lg:px-8 py-6 lg:py-12 border-t-1 border-gray-300">
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <Card key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">No hay productos disponibles</p>
                    </div>
                )}
            </div>
        </section>
    );
};

// Valor por defecto para la prop category
Products.defaultProps = {
    category: null
};

export default Products;