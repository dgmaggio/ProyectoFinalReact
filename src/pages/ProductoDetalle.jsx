import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import LoadingMsg from '../components/common/LoadingMsg';
import Button from '../components/common/Button';
import Stepper from "../components/common/Stepper"
import { formatPrice } from '../utils/formatPrice';
import { CartContext } from '../context/CartContext';
import useToast from '../hooks/useToast';
import { fetchProductById } from '../utils/api';
import SEO from '../components/common/SEO';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [cantidad, setCantidad] = useState(1);

    const { agregarAlCarrito } = useContext(CartContext);

    const handleAgregarAlCarrito = () => {        
        agregarAlCarrito(producto, cantidad);
        setCantidad(1);
    };

    const { notifyProductAdded } = useToast();

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                const data = await fetchProductById(id);
                setProducto(data);
            } catch (err) {
                console.error('Error loading product:', err);
                setProducto(null);
            } finally {
                setLoading(false);
            }
        };
    
        loadProduct();
    }, [id]);

    if (loading) return <LoadingMsg />;

    if (!producto) {
        return (
            <>
                <SEO 
                    title="Producto no encontrado"
                    description="El producto que buscas no existe o ha sido eliminado."
                    url={`${window.location.origin}/producto/${id}`}
                />
                <p className="text-center py-12 text-red-600">Producto no encontrado.</p>
            </>
        );
    }

    return (
        <>            
            <SEO 
                title={producto.title}
                description={`${producto.description.substring(0, 150)}... - Precio: ${formatPrice(producto.price)} - Categoría: ${producto.category}`}
                keywords={`${producto.title}, ${producto.category}, comprar, tienda online, ${formatPrice(producto.price)}`}
                image={producto.image}
                url={`${window.location.origin}/producto/${id}`}
                type="product"
            />

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

                        <div className="flex gap-4">
                            <Stepper
                                value={cantidad}
                                onChange={setCantidad}
                                min={1}
                                max={10}
                                productName={producto.title}
                            />
                            
                            <Button
                                onClick={() => {
                                    handleAgregarAlCarrito();
                                    notifyProductAdded(producto.title);

                                }}
                                ariaLabel={`Agregar ${producto.title} al carrito`}
                                className="w-full"
                            >
                                Agregar al carrito
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductoDetalle;