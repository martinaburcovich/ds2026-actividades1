import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Contacto from './pages/Contacto'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'
import Login from './pages/Login'
import SinPermiso from './pages/SinPermiso'
import NoEncontrado from './pages/NoEncontrado'
import { PrivateRoute } from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
          </Route>
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
