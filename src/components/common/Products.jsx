import { useEffect, useState, useContext } from 'react';
import Card from '../common/Card';
import PageHeader from '../common/PageHeader';
import LoadingMsg from '../common/LoadingMsg';
import Button from './Button';
import SearchBox from './SearchBox';
import { fetchProducts } from '../../utils/api';
import { CartContext } from '../../context/CartContext';
import SEO from './SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Products = ({ category }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError('');
            
            try {
                const data = await fetchProducts(category);
                setProductos(data);
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const getFilteredProducts = () => {
        // Primero filtrar por búsqueda
        let filtered = productos;
        
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = productos.filter(producto => 
                producto.title.toLowerCase().includes(term) ||
                producto.category.toLowerCase().includes(term)
            );
        }
        
        return filtered;
    };
    
    const getPaginatedProducts = () => {
        const filtered = getFilteredProducts();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filtered.slice(startIndex, endIndex);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setCurrentPage(1);
    };
    
    const goToPage = (page) => {
        setCurrentPage(page);
    };
    
    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    
    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        
        return pages;
    };

    const productosFiltrados = getFilteredProducts();
    const productosPaginados = getPaginatedProducts();

    const totalItems = productosFiltrados.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

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
        <>
            <SEO 
                // title={category ? `${category} | Todos los productos` : `Todos los productos`}
                title="Todos los productos"
                description="Explorá nuestra amplia selección de productos de calidad"
                keywords="productos, tienda, comprar online"
            />

            <section>
                <PageHeader />

                <SearchBox
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onClearSearch={handleClearSearch}
                    placeholder="Buscá por nombre o categoría productos..."
                    helpText="Escribí para buscar en tiempo real"
                    noResultsText="No encontramos productos para"
                    showResults={true}
                    resultsCount={productosFiltrados.length}
                    totalCount={productos.length}
                />
                <div className='bg-gray-100 px-4 lg:px-8 py-6 lg:py-8 border-t-1 border-gray-300'>
                    {totalItems > 0 && (
                    <div className="">
                        <div className='flex flex-col lg:flex-row justify-between mb-4 lg:mb-6 gap-2 lg:gap-0'>
                            <div className="self-center">
                                Mostrando {Math.min(startIndex + 1, totalItems)} - {Math.min(startIndex + itemsPerPage, totalItems)} de {totalItems} productos
                            </div>
                            
                            <div className="flex items-center self-center gap-2">
                                <label htmlFor="itemsPerPage">Productos por página:</label>
                                <select
                                    id="itemsPerPage"
                                    className='bg-white border border-gray-300 rounded p-2'
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value={8}>8</option>
                                    <option value={12}>12</option>
                                    <option value={24}>24</option>
                                    <option value={48}>48</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4">
                        
                    {productosPaginados.length > 0 ? (
                        productosPaginados.map((producto) => (
                                <Card key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />
                            ))
                        ) : searchTerm ? (                        
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500">
                                    No se encontraron productos para "{searchTerm}"
                                </p>

                                <button
                                    onClick={handleClearSearch}
                                    className="mt-2 text-cyan-500 hover:text-cyan-700 underline"
                                >
                                    Limpiar búsqueda
                                </button>
                            </div>
                        ) : (                        
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500">No hay productos disponibles</p>
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                    <div className='mt-4 lg:mt-6 flex justify-center gap-1'>
                        <div className="flex justify-center gap-1">
                            <Button
                                onClick={goToPrevious}
                                disabled={currentPage === 1}
                                className={`${currentPage === 1 ? 'border border-gray-300 bg-white! cursor-not-allowed! h-10 w-10 p-1! text-gray-400!' : 'h-10 w-10 p-1! border border-gray-100'}`}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </Button>

                            {getPageNumbers().map((page, index) => (
                                <span key={index}>
                                    {page === '...' ? (
                                        <span className="px-3 py-2">...</span>
                                    ) : (
                                        <Button
                                            className={`${currentPage === page ? 'h-10 w-10 p-1! border border-gray-500 text-inherit! bg-white!' : 'border border-gray-300 text-inherit! bg-white! h-10 w-10 p-1!'}`}
                                            onClick={() => goToPage(page)}
                                        >
                                            {page}
                                        </Button>
                                    )}
                                </span>
                            ))}

                            <Button
                                onClick={goToNext}
                                disabled={currentPage === totalPages}
                                className={`${currentPage === totalPages ? 'border border-gray-300 bg-white! cursor-not-allowed! h-10 w-10 p-1! text-gray-400!' : 'h-10 w-10 p-1! border border-gray-100'}`}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Button>
                        </div>
                    </div>
                    )}
                </div>
            </section>
        </>
    );
};

Products.defaultProps = {
    category: null
};

export default Products;