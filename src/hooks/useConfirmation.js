// hooks/useConfirmation.js o utils/useConfirmation.js
import { useState } from 'react';

const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(false);

  const showConfirmation = ({
    title = "Confirmar acción",
    message = "¿Estás seguro de que quieres continuar?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    type = "warning",
    icon = null,
    onConfirm = () => {},
    onCancel = () => {}
  }) => {
    setConfig({
      title,
      message,
      confirmText,
      cancelText,
      type,
      icon,
      onConfirm,
      onCancel
    });
    setIsOpen(true);
    setLoading(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await config.onConfirm();
      // Cerrar modal después de confirmar
      setIsOpen(false);
      setLoading(false);
    } catch (error) {
      console.error('Error en confirmación:', error);
      setLoading(false);
      // No cerrar el modal si hay error para que el usuario vea el problema
    }
  };

  const handleCancel = () => {
    // Ejecutar callback personalizado si existe
    if (config.onCancel) {
      config.onCancel();
    }
    // SIEMPRE cerrar el modal
    setIsOpen(false);
    setLoading(false);
  };

  // Funciones predefinidas para casos comunes
  const confirmDelete = (itemName, onConfirm) => {
    showConfirmation({
      title: "Eliminar producto",
      message: `¿Estás seguro de que quieres eliminar "${itemName}"? Esta acción no se puede deshacer.`,
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      type: "danger",
      onConfirm
      // No pasamos onCancel para que use el handleCancel por defecto
    });
  };

  const confirmClearCart = (onConfirm) => {
    showConfirmation({
      title: "Vaciar carrito",
      message: "¿Estás seguro de que quieres vaciar el carrito? Se eliminarán todos los productos.",
      confirmText: "Vaciar carrito",
      cancelText: "Cancelar",
      type: "danger",
      onConfirm
    });
  };

  const confirmLogout = (onConfirm) => {
    showConfirmation({
      title: "Cerrar sesión",
      message: "¿Estás seguro de que quieres cerrar sesión?",
      confirmText: "Cerrar sesión",
      cancelText: "Cancelar",
      type: "info",
      onConfirm
    });
  };

  return {
    // Props para el modal
    modalProps: {
      isOpen,
      loading,
      ...config,  // ← Primero el config
      onConfirm: handleConfirm,  // ← Después las funciones (para que no se sobrescriban)
      onCancel: handleCancel,
    },
    
    // Funciones para mostrar confirmaciones
    showConfirmation,
    confirmDelete,
    confirmClearCart,
    confirmLogout,
    
    // Control manual
    closeModal: () => setIsOpen(false)
  };
};

export default useConfirmation;