import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartProvider';
import { AuthProvider } from './context/AuthProvider';

createRoot(document.getElementById('root')).render(
<StrictMode>
	<HelmetProvider>
		<BrowserRouter>
			<AuthProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</AuthProvider>
		</BrowserRouter>
	</HelmetProvider>
</StrictMode>,
)