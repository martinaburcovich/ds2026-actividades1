import { useEffect } from 'react'
import { Row, Col, Spinner, Alert } from 'react-bootstrap'
import BookCard from '../components/BookCard'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/libro'

function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros')

  useEffect(() => {
    document.title = loading ? 'Cargando...' : 'Catálogo de libros'
  }, [loading])

  if (loading) return <div className="loading-state"><Spinner animation="border" /><span>Cargando libros…</span></div>
  if (error) return <Alert variant="danger" className="content-alert"><strong>No pudimos cargar el catálogo.</strong><br />{error}</Alert>

  return (
    <section className="catalog-page">
      <div className="page-heading">
        <h1>Catálogo de libros</h1>
        <p>Elegí tu próxima lectura entre nuestros títulos disponibles.</p>
      </div>
      {(libros ?? []).length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true">📚</span>
          <h2>Próximamente habrá libros acá</h2>
          <p>Estamos preparando nuevas historias para vos.</p>
        </div>
      ) : (
        <Row className="g-4">
          {(libros ?? []).map((libro) => (
            <Col md={6} xl={4} key={libro.id}>
              <BookCard libro={libro} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  )
}

export default Catalogo
