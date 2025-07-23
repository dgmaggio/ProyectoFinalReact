import { useEffect } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ConfirmationModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  title = "Confirmar acción",
  message = "¿Estás seguro de que quieres continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "warning", // warning, danger, info
  icon = null,
  loading = false
}) => {

  const handleOverlayClick = (e) => {
    // Solo cerrar si se hace click en el overlay, no en el contenido del modal
    if (e.target === e.currentTarget && !loading) {
      onCancel();
    }
  };

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) {
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
  }, [isOpen, onCancel, loading]);

  // Configuración de colores y estilos según el tipo
  const getTypeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          iconColor: 'text-red-400',
          confirmButtonClass: 'bg-red-400 hover:bg-red-800',
          defaultIcon: faTrash
        };
      case 'info':
        return {
          iconColor: 'text-blue-500',
          confirmButtonClass: 'bg-blue-600 hover:bg-blue-700',
          defaultIcon: faShoppingCart
        };
      case 'warning':
      default:
        return {
          iconColor: 'text-yellow-400',
          confirmButtonClass: 'bg-yellow-400 hover:bg-yellow-800',
          defaultIcon: faExclamationTriangle
        };
    }
  };

  // No renderizar nada si el modal está cerrado
  if (!isOpen) return null;

  const typeConfig = getTypeConfig();
  const displayIcon = icon || typeConfig.defaultIcon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header del modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-300">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon 
              icon={displayIcon} 
              className={`text-xl ${typeConfig.iconColor}`}
            />
            <h2 className="text-xl font-bold color-cyan-950">
              {title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-xl"
            disabled={loading}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          <p className="leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer del modal con botones */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-300">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 hover:bg-gray-200 font-medium disabled:opacity-50 cursor-pointer rounded"
          >
            {cancelText}
          </button>
          
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={`px-6 py-2 text-white font-medium disabled:opacity-50 ${typeConfig.confirmButtonClass}`}
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Procesando...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;