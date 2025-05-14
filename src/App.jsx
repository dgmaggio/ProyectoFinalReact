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
import './App.css'


function App() {

    return (
        <>
            <Header />
            <main className="">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/novedades" element={<Novedades />} />
                    <Route path="/ofertas" element={<Ofertas />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
