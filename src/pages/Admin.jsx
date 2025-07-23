import { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import ProductsForm from '../components/admin/ProductsForm';
import ProductsList from '../components/admin/ProductsList';
import ConfirmationModal from '../components/common/ConfirmationModal';
import Button from '../components/common/Button';
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

    const { notifySuccess, notifyError } = useToast();
    const { modalProps, confirmDelete } = useConfirmation();

    // Cargar productos al montar el componente
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
        // Buscar el producto para mostrar su nombre en la confirmación
        const producto = productos.find(p => p.id === id);
        const nombreProducto = producto ? producto.title : 'este producto';

        // Mostrar modal de confirmación
        confirmDelete(nombreProducto, async () => {
            try {
                await deleteProduct(id);
                setProductos(productos.filter(p => p.id !== id));
                
                // Si estábamos editando el producto eliminado, cancelar edición
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

    return (
        <section>
            <PageHeader />

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

            {/* Modal de confirmación */}
            <ConfirmationModal {...modalProps} />
        </section>
    );
};

export default Admin;