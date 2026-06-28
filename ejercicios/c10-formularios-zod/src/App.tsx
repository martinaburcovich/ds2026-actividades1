import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Contacto from './pages/Contacto'
import LibroDetalle from './pages/LibroDetalle'
import LibroNuevo from './pages/LibroNuevo'

export interface Libro {
  isbn: string
  titulo: string
  autor: string
}

const librosIniciales: Libro[] = [
  { isbn: '9781338617436', titulo: 'Heartstopper Vol. 1', autor: 'Alice Oseman' },
  { isbn: '9780747532743', titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling' },
  { isbn: '9780380977789', titulo: 'Coraline', autor: 'Neil Gaiman' },
  { isbn: '9780743477116', titulo: 'Romeo y Julieta', autor: 'William Shakespeare' },
  { isbn: '9780670813025', titulo: 'It', autor: 'Stephen King' },
  { isbn: '9780525478812', titulo: 'Bajo la misma estrella', autor: 'John Green' },
]

function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales)

  const agregarLibro = (nuevo: Libro) => {
    setLibros([...libros, nuevo])
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/libros/:isbn" element={<LibroDetalle />} />
      </Routes>
    </Layout>
  )
}

export default App
