import Button from './Button';
import { Link } from "react-router-dom";
import { formatPrice } from '../../utils/formatPrice';
import useToast from '../../hooks/useToast';

const Card = ({ producto, agregarAlCarrito }) => {
    
    const { notifyProductAdded } = useToast();


    return (
        <>
            <div className="border border-zinc-300 bg-white p-4 rounded-xl flex flex-col space-x-4 justify-between hover:shadow-lg transition">
                <div className="flex md:flex-col">
                    <div className= "w-1/2 h-30 px-4 mb-4 flex items-center justify-center md:w-full md:flex-row">
                        <img
                            src={producto.image}
                            alt={producto.title}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between md:text-center md:w-full">
                        <h2 className="text-cyan-950 font-bold mb-4">
                            {producto.title}
                        </h2>

                        <div>
                            <p className="text-lg pb-2">{formatPrice(producto.price)}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <Button
                        onClick={() => {
                            agregarAlCarrito(producto);
                            notifyProductAdded(producto.title);
                        }}
                        ariaLabel={`Agregar ${producto.title} al carrito`}
                        className="w-full text-xs lg:px-0"
                    >
                        Agregar al carrito
                    </Button>

                    <Link
                        to={`/productos/${producto.id}`}
                        className="alink text-xs w-full font-semibold pt-2 text-center tracking-wider"
                    >
                        Ver detalle
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Card;
