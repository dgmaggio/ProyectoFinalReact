// hooks/useToast.js o utils/useToast.js
import toast from 'react-hot-toast';

const useToast = () => {
  // Toast de éxito para productos agregados al carrito
  const notifyProductAdded = (productTitle) => {
    toast.success(`Se agregó ${productTitle.slice(0, 25)}...`);
  };

  // Toast de error para productos eliminados del carrito
  const notifyProductRemoved = (productTitle) => {
    toast.error(`Se eliminó ${productTitle.slice(0, 25)}...`);
  };

  // Toast de éxito genérico
  const notifySuccess = (message) => {
    toast.success(message);
  };

  // Toast de error genérico
  const notifyError = (message) => {
    toast.error(message);
  };

  // Toast de información
  const notifyInfo = (message) => {
    toast(message, {
      icon: 'ℹ️',
    });
  };

  // Toast de advertencia
  const notifyWarning = (message) => {
    toast(message, {
      icon: '⚠️',
      style: {
        background: '#FEF3C7',
        color: '#92400E',
      },
    });
  };

  // Toast personalizado para login
  const notifyLogin = (success, message) => {
    if (success) {
      toast.success(`¡Bienvenido ${message}!`);
    } else {
      toast.error(message);
    }
  };

  // Toast para carrito vacío
  const notifyCartEmpty = () => {
    toast.success('Carrito vaciado correctamente');
  };

  return {
    notifyProductAdded,
    notifyProductRemoved,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
    notifyLogin,
    notifyCartEmpty,
  };
};

export default useToast;