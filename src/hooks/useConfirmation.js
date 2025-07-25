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
      setIsOpen(false);
      setLoading(false);
    } catch (error) {
      console.error('Error en confirmación:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (config.onCancel) {
      config.onCancel();
    }
    setIsOpen(false);
    setLoading(false);
  };

  const confirmDelete = (itemName, onConfirm) => {
    showConfirmation({
      title: "Eliminar producto",
      message: `¿Estás seguro de que quieres eliminar "${itemName}"? Esta acción no se puede deshacer.`,
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      type: "danger",
      onConfirm
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
    modalProps: {
      isOpen,
      loading,
      ...config,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    },
    
    showConfirmation,
    confirmDelete,
    confirmClearCart,
    confirmLogout,
    
    closeModal: () => setIsOpen(false)
  };
};

export default useConfirmation;