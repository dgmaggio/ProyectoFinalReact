import { useEffect, useState } from 'react';
import Card from '../common/Card';
import PageHeader from '../common/PageHeader';
import LoadingMsg from '../common/LoadingMsg';

const Products = ({ category }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Construir la URL en función de si hay una categoría específica o no
        const url = category 
            ? `https://fakestoreapi.com/products/category/${category}`
            : 'https://fakestoreapi.com/products?limit=18';
            
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProductos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error de carga de API", err);
                setLoading(false);
            });
    }, [category]); // Importante: incluir category en el array de dependencias

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