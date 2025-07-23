import { useState, useEffect } from 'react';
import Button from "../common/Button";
import Field from "../common/Field";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { fetchCategories } from '../../utils/api';

function ProductsFormModal({ isOpen, onSubmit, productoAEditar, onCancel }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [categoria, setCategoria] = useState('electronics');
  const [categorias, setCategorias] = useState([]);
  const [errores, setErrores] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar categorías al montar el componente
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategorias(cats);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        // Categorías por defecto si falla la carga
        setCategorias(['electronics', 'jewelery', "men's clothing", "women's clothing"]);
      }
    };
    
    loadCategories();
  }, []);

  useEffect(() => {
    if (productoAEditar) {
      // Adaptamos los datos de la API al formulario
      setNombre(productoAEditar.title || productoAEditar.nombre || '');
      setPrecio((productoAEditar.price || productoAEditar.precio || '').toString());
      setDescripcion(productoAEditar.description || '');
      setImagen(productoAEditar.image || '');
      setCategoria(productoAEditar.category || 'electronics');
      setErrores([]);
    } else {
      // Limpiar formulario para nuevo producto
      setNombre('');
      setPrecio('');
      setDescripcion('');
      setImagen('');
      setCategoria('electronics');
      setErrores([]);
    }
  }, [productoAEditar]);

  const validar = () => {
    const erroresValidacion = [];
    
    if (!nombre.trim()) {
      erroresValidacion.push('El nombre del producto es obligatorio.');
    }
    
    if (!precio || isNaN(precio) || Number(precio) <= 0) {
      erroresValidacion.push('El precio debe ser un número mayor a 0.');
    }
    
    if (!descripcion.trim()) {
      erroresValidacion.push('La descripción es obligatoria.');
    } else if (descripcion.trim().length < 10) {
      erroresValidacion.push('La descripción debe tener al menos 10 caracteres.');
    }
    
    if (imagen && !isValidURL(imagen)) {
      erroresValidacion.push('La URL de la imagen no es válida.');
    }
    
    setErrores(erroresValidacion);
    return erroresValidacion.length === 0;
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setLoading(true);

    const producto = {
      nombre: nombre.trim(),
      title: nombre.trim(), // Para compatibilidad con API
      precio: Number(precio),
      price: Number(precio), // Para compatibilidad con API
      description: descripcion.trim(),
      image: imagen.trim() || 'https://via.placeholder.com/300x300?text=Producto',
      category: categoria
    };

    if (productoAEditar) {
      producto.id = productoAEditar.id; 
    }

    try {
      await onSubmit(producto);
      
      // Limpiar formulario solo si es un producto nuevo
      if (!productoAEditar) {
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setImagen('');
        setCategoria('electronics');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    // Solo cerrar si se hace click en el overlay, no en el contenido del modal
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  // No renderizar nada si el modal está cerrado
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold color-cyan-950">
            {productoAEditar ? 'Editar producto' : 'Agregar nuevo producto'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            disabled={loading}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Errores */}
            {errores.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                <h3 className="text-red-800 font-medium mb-2">Errores en el formulario:</h3>
                <ul className="text-red-700 list-disc list-inside">
                  {errores.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              <Field
                label="Nombre del Producto *"
                name="title"
                type="text"
                placeholder="Ej: iPhone 14 Pro"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={loading}
              />
              
              <Field
                label="Precio *"
                name="price"
                type="number"
                placeholder="0.00"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                min="0"
                step="0.01"
                disabled={loading}
              />

              <Field
                label="Descripción *"
                name="descripcion"
                type="textarea"
                placeholder="Descripción detallada del producto... (mínimo 10 caracteres)"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                disabled={loading}
                as="textarea"
                rows={4}
              />

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium mb-1">
                  Categoría
                </label>
                <select 
                  id="categoria"
                  value={categoria} 
                  onChange={(e) => setCategoria(e.target.value)}
                  disabled={loading}
                  className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <Field
                label="URL de la Imagen"
                name="imagen"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                disabled={loading}
              />

              {/* Preview de imagen */}
              {imagen && isValidURL(imagen) && (
                <div>                  
                  <div className="border border-gray-300 rounded p-2 inline-block">
                    <img 
                      src={imagen} 
                      alt="Preview" 
                      style={{ width: '128px', height: '128px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/128x128?text=Error';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer del modal con botones */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            type="button" 
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 hover:bg-gray-200 font-medium disabled:opacity-50 cursor-pointer rounded"
          >
            Cancelar
          </button>
          
          <Button 
            type="submit" 
            disabled={loading}
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faPlus} /> {loading ? 'Guardando...' : (productoAEditar ? 'Actualizar' : 'Agregar')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductsFormModal;