import { Alert, Badge, Col, Row, Spinner } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/libro'

function LibroDetalle() {
  const { id } = useParams<{ id: string }>()
  const { data: libro, loading, error } = useFetch<Libro>(`/libros/${id ?? ''}`)

  if (loading) return <div className="loading-state"><Spinner animation="border" /><span>Cargando libro…</span></div>
  if (error || !libro) {
    return (
      <Alert variant="warning" className="content-alert">
        <strong>No encontramos ese libro.</strong><br />
        {error ?? 'Probá volver al catálogo y elegir otro título.'}
      </Alert>
    )
  }

  return (
    <section className="detail-page">
      <Link to="/catalogo" className="btn btn-link back-link px-0">← Volver al catálogo</Link>
      <Row className="detail-card g-0 align-items-stretch">
        <Col md={5} className="detail-image-wrap">
          <img src={libro.imagen} alt={`Portada de ${libro.titulo}`} className="detail-image" />
        </Col>
        <Col md={7}>
          <div className="detail-content">
            <Badge bg={libro.disponible ? 'success' : 'secondary'} className="mb-3">
              {libro.disponible ? 'Disponible' : 'Sin stock'}
            </Badge>
            <p className="detail-author">{libro.autor.nombre}</p>
            <h1>{libro.titulo}</h1>
            <p className="detail-nationality">Autor/a de {libro.autor.nacionalidad}</p>
            <p className="detail-price">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(libro.precio)}</p>
            <p className="detail-description">Una lectura para sumar a tu biblioteca y disfrutar sin apuro.</p>
            <Link to="/catalogo" className="btn btn-primary">Seguir explorando</Link>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default LibroDetalle
