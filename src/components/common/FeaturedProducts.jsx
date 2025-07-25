import { useEffect, useState, useContext } from 'react';
import Card from '../common/Card';
import LoadingMsg from '../common/LoadingMsg';
import ButtonLink from '../common/ButtonLink';
import { fetchProducts } from '../../utils/api';
import { CartContext } from '../../context/CartContext';

const FeaturedProducts = ({ limit = 6 }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        const loadFeaturedProducts = async () => {
            setLoading(true);
            setError('');
            
            try {
                const data = await fetchProducts();
                
                const featured = data
                    .filter(producto => producto.featured === true)
                    .slice(0, limit);
                
                setProductos(featured);
            } catch (err) {
                console.error("Error al cargar productos destacados:", err);
                setError('Error al cargar productos destacados');
                setProductos([]);
            } finally {
                setLoading(false);
            }
        };

        loadFeaturedProducts();
    }, [limit]);

    if (loading) {
        return (
            <section className="py-8">
                <div className="px-4 lg:px-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Productos Destacados</h2>
                    <LoadingMsg />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-8">
                <div className="px-4 lg:px-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Productos Destacados</h2>
                    <div className="text-center py-8">
                        <p className="text-red-500">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    if (productos.length === 0) {
        return null;
    }

    return (
        <section className="py-8 lg:py-12">
            <div className="px-4 lg:px-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 lg:mb-0 text-center">
                    Productos Destacados
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 py-8 lg:py-12">
                    {productos.map((producto) => (
                        <Card 
                            key={producto.id} 
                            producto={producto} 
                            agregarAlCarrito={agregarAlCarrito} 
                        />
                    ))}
                </div>
                <div className="text-center">
                    <ButtonLink to="/productos" className="text-sm">
                        Ver todos los productos
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;