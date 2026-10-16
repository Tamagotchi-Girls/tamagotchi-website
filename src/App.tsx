import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Apply from './pages/Apply'
import Novedades from './pages/Novedades'
import NovedadDetalle from './pages/NovedadDetalle'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solicitud/*" element={<Apply />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/novedades/:id" element={<NovedadDetalle />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
