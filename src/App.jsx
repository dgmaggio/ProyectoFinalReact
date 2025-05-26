import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Novedades from './pages/Novedades'
import Ofertas from './pages/Ofertas'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import ProductoDetalle from './pages/ProductoDetalle'
import NotFound from './pages/NotFound'
import Perfil from './pages/Perfil'
import Admin from './pages/Admin'
import PrivateRoute from "./components/common/PrivateRoute";
import './App.css'


function App() {

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/novedades" element={<Novedades />} />
                    <Route path="/ofertas" element={<Ofertas />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/login" element={<Login />} />                    
                    <Route path="/productos/:id" element={<ProductoDetalle />} />                    
                    <Route path="*" element={<NotFound />} />

                    {/* Rutas protegidas */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/perfil/:username" element={<Perfil />} />
                        <Route path="/admin" element={<Admin />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
