import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import LoadingMsg from '../components/common/LoadingMsg';
import Button from '../components/common/Button';
import { formatPrice } from '../utils/formatPrice';
import toast, { Toaster } from 'react-hot-toast';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    const notify = () => {
        toast.success(
          <>
            Se agregó {producto.title.slice(0, 25)}...
          </>
        );
      };

    useEffect(() => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
            setProducto(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error loading product:', err);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <LoadingMsg />;

    if (!producto) return <p className="text-center py-12 text-red-600">Producto no encontrado.</p>;

    return (
        <section>
        <PageHeader title={producto.title} breadcrumbLabel={producto.title} noTitle />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:w-1/2 gap-4 lg:gap-12 mx-auto px-4 lg:px-8 pb-6 lg:pb-12">
            <div className= "max-h-68 flex items-center justify-center md:w-full">
                <img
                    src={producto.image}
                    alt={producto.title}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
            <div>
                <p className="uppercase text-xs text-zinc-500 tracking-wider">
                    {producto.category}
                </p>

                <h1 className="text-xl font-bold text-cyan-950 pb-3">
                    {producto.title}
                </h1>

                <p className="text-2xl pb-3">{formatPrice(producto.price)}</p>

                <p className="text-sm pb-6">{producto.description}</p>
                
                <Button
                    onClick={notify}
                    className="w-full"
                >
                    Agregar al carrito
                </Button>

                <Toaster />
            </div>
        </div>
        </section>
    );
};

export default ProductoDetalle;
