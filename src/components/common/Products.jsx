import { useEffect, useState } from 'react';
import Card from '../common/Card';
import PageHeader from '../common/PageHeader';
import LoadingMsg from '../common/LoadingMsg';
import { fetchProducts } from '../../utils/api';

const Products = ({ category }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    
        fetchProducts(category)
            .then(data => {
                setProductos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar productos", err);
                setLoading(false);
            });
    }, [category]);

    return (
        <section>
            <PageHeader />

            {loading ? (
                <LoadingMsg />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-3 bg-gray-100 px-4 lg:px-8 py-6 lg:py-12 border-t-1 border-gray-300">
                    {productos.map((producto) => (
                        <Card key={producto.id} producto={producto} />
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