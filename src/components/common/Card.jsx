import Button from './Button';

const Card = ({ producto }) => {
    return (
        <>
            {/* aaaaaaaaaaaaaaaaaaaaaa */}
            <div className="border border-zinc-300 bg-white p-4 rounded-md flex flex-col space-x-4 justify-between">
                <div className="flex md:flex-col">
                    <div
                        className= "w-1/2 h-30 px-4 mb-4 flex items-center justify-center md:w-full md:flex-row"
                    >
                        <img
                            src={producto.image}
                            alt={producto.title}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between md:text-center md:w-full">
                        <h2 className="text-sm mb-4">
                            {producto.title}
                        </h2>

                        <div>
                            <p className="text-lg font-bold pb-2">${producto.price}</p>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={() => alert(`Agregado: ${producto.title}`)}
                    className="w-full"
                >
                    Agregar al carrito
                </Button>
            </div>
            {/* aaaaaaaaaaaaaaaaaaaaaa */}
            {/* <div className="border border-zinc-300 bg-white p-4 rounded-md flex flex-col transition duration-200 h-full">
                
                <div className="h-48 px-4 mb-4 flex items-center justify-center">
                    <img
                        src={producto.image}
                        alt={producto.title}
                        className="max-h-44 object-contain"
                    />
                </div>
                
                <h2 className="text-center text-sm mb-4">{producto.title}</h2>

                <div className="mt-auto">
                    <p className="text-lg font-bold text-center pb-2">${producto.price}</p>

                    <Button
                        onClick={() => alert(`Agregado: ${producto.title}`)}
                        className="w-full"
                    >
                        Agregar al carrito
                    </Button>
                </div>
            </div> */}
        </>
    );
};

export default Card;
