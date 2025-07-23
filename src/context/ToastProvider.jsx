// components/common/ToastProvider.jsx
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster 
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Configuración por defecto para todos los toasts
        duration: 4000,
        style: {
          background: '#fff',
          color: '#363636',
        },
        // Configuración específica por tipo
        success: {
          duration: 3000,
          theme: {
            primary: '#4aed88',
          },
        },
        error: {
          duration: 4000,
          theme: {
            primary: '#ff6b6b',
          },
        },
      }}
    />
  );
};

export default ToastProvider;