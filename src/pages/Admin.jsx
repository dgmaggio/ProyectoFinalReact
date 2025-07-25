import { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import ProductsForm from '../components/admin/ProductsForm';
import ProductsList from '../components/admin/ProductsList';
import ConfirmationModal from '../components/common/ConfirmationModal';
import Button from '../components/common/Button';
import SearchBox from '../components/common/SearchBox'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createProduct, updateProduct, deleteProduct, fetchProducts } from '../utils/api';
import useToast from "../hooks/useToast";
import useConfirmation from "../hooks/useConfirmation";

const Admin = () => {    
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { notifySuccess, notifyError } = useToast();
    const { modalProps, confirmDelete } = useConfirmation();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProductos(data);
        } catch (err) {
            notifyError('Error al cargar productos: ' + err.message);
            console.error('Error al cargar productos:', err);
        }
    };

    const getFilteredProducts = () => {
        if (!searchTerm.trim()) {
            return productos;
        }

        const term = searchTerm.toLowerCase();
        return productos.filter(producto => 
            producto.title.toLowerCase().includes(term) ||
            producto.category.toLowerCase().includes(term) ||
            producto.id.toString().includes(term)
        );
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };
    
    const agregarProducto = async (producto) => {
        setLoading(true);
        try {
            const nuevoProducto = await createProduct(producto);
            setProductos([...productos, nuevoProducto]);
            notifySuccess('Producto agregado correctamente');
            setIsModalOpen(false);
        } catch (err) {
            notifyError('Error al agregar producto: ' + err.message);
            console.error('Error al agregar producto:', err);
        } finally {
            setLoading(false);
        }
    };

    const actualizarProducto = async (productoActualizado) => {
        setLoading(true);
        try {
            const productoEditado = await updateProduct(productoActualizado.id, productoActualizado);
            setProductos(productos.map(p => 
                p.id === productoActualizado.id ? productoEditado : p
            ));
            setProductoAEditar(null);
            setIsModalOpen(false);
            notifySuccess('Producto actualizado correctamente');
        } catch (err) {
            notifyError('Error al actualizar producto: ' + err.message);
            console.error('Error al actualizar producto:', err);
        } finally {
            setLoading(false);
        }
    };

    const borrarProducto = async (id) => {
        const producto = productos.find(p => p.id === id);
        const nombreProducto = producto ? producto.title : 'este producto';

        confirmDelete(nombreProducto, async () => {
            try {
                await deleteProduct(id);
                setProductos(productos.filter(p => p.id !== id));
                
                if (productoAEditar && productoAEditar.id === id) {
                    setProductoAEditar(null);
                    setIsModalOpen(false);
                }
                
                notifySuccess('Producto eliminado correctamente');
            } catch (err) {
                notifyError('Error al eliminar producto: ' + err.message);
                console.error('Error al eliminar producto:', err);
            }
        });
    };

    const editarProducto = (producto) => {
        const productoParaEditar = {
            id: producto.id,
            title: producto.title,
            price: producto.price,
            description: producto.description,
            image: producto.image,
            category: producto.category,
            featured: producto.featured || false
        };
        
        setProductoAEditar(productoParaEditar);
        setIsModalOpen(true);
    };

    const abrirModalNuevoProducto = () => {
        setProductoAEditar(null);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setProductoAEditar(null);
    };

    const productosFiltrados = getFilteredProducts();

    return (
        <section>
            <PageHeader title="Administrador de Productos" breadcrumb="Administración" />

            <div className="px-4 lg:px-8 pb-2">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                    <Button onClick={abrirModalNuevoProducto}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span className="ml-2">Agregar Producto</span>
                    </Button>
                    
                    <div className="text-sm text-gray-600">
                        {searchTerm ? (
                            <span>
                                Mostrando {productosFiltrados.length} de {productos.length} productos
                            </span>
                        ) : (
                            <span>Total: {productos.length} productos</span>
                        )}
                    </div>
                </div>
            </div>

            <SearchBox
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
                placeholder="Buscá por nombre, categoría o ID..."
                helpText="Escribí para buscar en tiempo real"
                noResultsText="No se encontraron productos para"
                showResults={true}
                resultsCount={productosFiltrados.length}
                totalCount={productos.length}
            />
            
            <ProductsList
                productos={productosFiltrados}
                onEdit={editarProducto}
                onDelete={borrarProducto}
            />

            <ProductsForm
                isOpen={isModalOpen}
                onSubmit={productoAEditar ? actualizarProducto : agregarProducto}
                productoAEditar={productoAEditar}
                onCancel={cerrarModal}
            />

            <ConfirmationModal {...modalProps} />
        </section>
    );
};

export default Admin;