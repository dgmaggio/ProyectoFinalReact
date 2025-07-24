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
        // Configuración general
        duration: 3000,
        style: {
          background: '#fff',
          color: '#363636',
        },
        // Configuración específica
        success: {
          duration: 3000,
          theme: {
            primary: '#4aed88',
          },
        },
        error: {
          duration: 3000,
          theme: {
            primary: '#ff6b6b',
          },
        },
      }}
    />
  );
};

export default ToastProvider;