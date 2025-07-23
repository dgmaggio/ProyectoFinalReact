import { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import ProductsForm from '../components/admin/ProductsForm';
import ProductsList from '../components/admin/ProductsList';
import Button from '../components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createProduct, updateProduct, deleteProduct, fetchProducts } from '../utils/api';

const Admin = () => {
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Cargar productos al montar el componente
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProductos(data);
        } catch (err) {
            setError('Error al cargar productos: ' + err.message);
            console.error('Error al cargar productos:', err);
        }
    };

    const agregarProducto = async (producto) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const nuevoProducto = await createProduct(producto);
            setProductos([...productos, nuevoProducto]);
            setSuccess('Producto agregado correctamente');
            setIsModalOpen(false); // Cerrar modal
            
            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Error al agregar producto: ' + err.message);
            console.error('Error al agregar producto:', err);
        } finally {
            setLoading(false);
        }
    };

    const actualizarProducto = async (productoActualizado) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const productoEditado = await updateProduct(productoActualizado.id, productoActualizado);
            
            setProductos(productos.map(p => 
                p.id === productoActualizado.id ? productoEditado : p
            ));
            setProductoAEditar(null);
            setIsModalOpen(false); // Cerrar modal
            setSuccess('Producto actualizado correctamente');
            
            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Error al actualizar producto: ' + err.message);
            console.error('Error al actualizar producto:', err);
        } finally {
            setLoading(false);
        }
    };

    const borrarProducto = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            return;
        }

        try {
            await deleteProduct(id);
            setProductos(productos.filter(p => p.id !== id));
            
            // Si estábamos editando el producto eliminado, cancelar edición
            if (productoAEditar && productoAEditar.id === id) {
                setProductoAEditar(null);
                setIsModalOpen(false);
            }
            
            setSuccess('Producto eliminado correctamente');
            
            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Error al eliminar producto: ' + err.message);
            console.error('Error al eliminar producto:', err);
        }
    };

    const editarProducto = (producto) => {
        // Adaptar los datos del producto de la API al formato esperado por el formulario
        const productoParaEditar = {
            id: producto.id,
            nombre: producto.title,
            title: producto.title,
            precio: producto.price,
            price: producto.price,
            description: producto.description,
            image: producto.image,
            category: producto.category
        };
        
        setProductoAEditar(productoParaEditar);
        setIsModalOpen(true); // Abrir modal
        setError('');
        setSuccess('');
    };

    const abrirModalNuevoProducto = () => {
        setProductoAEditar(null);
        setIsModalOpen(true);
        setError('');
        setSuccess('');
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setProductoAEditar(null);
        setError('');
        setSuccess('');
    };

    return (
        <section>
            <PageHeader />
            
            {/* Mensajes de estado */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 lg:mx-8 mb-4">
                    <span className="font-medium">Error:</span>
                    <span className="ml-2">{error}</span>
                </div>
            )}
            
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mx-4 lg:mx-8 mb-4">
                    <span className="font-medium">Éxito:</span>
                    <span className="ml-2">{success}</span>
                </div>
            )}

            {/* Botón para agregar producto */}
            <div className="px-4 lg:px-8 pb-6">
                <Button onClick={abrirModalNuevoProducto}>
                    <FontAwesomeIcon icon={faPlus} /> Agregar Producto
                </Button>
            </div>
            
            <hr />
            
            {/* Lista de productos */}
            <ProductsList
                productos={productos}
                onEdit={editarProducto}
                onDelete={borrarProducto}
            />

            {/* Modal del formulario */}
            <ProductsForm
                isOpen={isModalOpen}
                onSubmit={productoAEditar ? actualizarProducto : agregarProducto}
                productoAEditar={productoAEditar}
                onCancel={cerrarModal}
            />
        </section>
    );
};

export default Admin;