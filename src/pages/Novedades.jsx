import { useEffect, useState } from 'react';
import Card from '../components/common/Card';
import PageHeader from '../components/common/PageHeader';
import LoadingMsg from '../components/common/LoadingMsg';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/category/women's clothing")
            .then(res => res.json())
            .then(data => {
                setProductos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error de carga de API", err);
                setLoading(false);
            });
    }, []);

    return (
        <section>
            <PageHeader />

            {loading ? (
                <LoadingMsg />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4 xl:gap-6 bg-gray-100 px-4 lg:px-8 py-6 lg:py-12">
                    {productos.map((producto) => (
                        <Card key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Productos;