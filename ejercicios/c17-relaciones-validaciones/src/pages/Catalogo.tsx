import { useEffect } from 'react'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import BookCard from '../components/BookCard'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../App'

function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json')

  useEffect(() => {
    document.title = loading ? 'Cargando...' : 'Catálogo de libros'
  }, [loading])

  if (loading) return <Spinner animation="border" className="m-5" />
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>

  return (
    <Container className="my-5">
      <h2 className="mb-4">Catálogo de libros</h2>
      <Row>
        {(libros ?? []).map((libro) => (
          <Col md={4} className="mb-4" key={libro.isbn}>
            <BookCard
              isbn={libro.isbn}
              titulo={libro.titulo}
              autor={libro.autor}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Catalogo