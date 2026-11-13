import { Link } from 'react-router-dom'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import BookCard from '../components/BookCard'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/libro'

const titulosDeLaPortada = [
  'Heartstopper Vol. 1',
  'Harry Potter y la piedra filosofal',
  'Coraline',
  'Romeo y Julieta',
  'It',
  'Bajo la misma estrella',
]

function Home() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros')
  const librosDeLaPortada = (libros ?? []).filter((libro) => titulosDeLaPortada.includes(libro.titulo))

  return (
    <div className="home-page">
      <section className="home-hero text-center">
        <h1>Esta es mi librería 📚</h1>
        <p className="lead">Descubrí los mejores libros</p>
        <Link to="/catalogo" className="btn btn-dark">Ver catálogo</Link>
      </section>

      <section className="featured-books">
        {loading && <div className="loading-state"><Spinner animation="border" /><span>Cargando libros…</span></div>}
        {error && <Alert variant="danger">No se pudieron cargar los libros: {error}</Alert>}
        {!loading && !error && (
          <Row className="g-4">
            {librosDeLaPortada.map((libro) => (
              <Col md={4} key={libro.id}>
                <BookCard libro={libro} />
              </Col>
            ))}
          </Row>
        )}
      </section>
    </div>
  )
}

export default Home
