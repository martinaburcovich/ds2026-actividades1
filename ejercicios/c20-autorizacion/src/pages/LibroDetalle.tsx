import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'

function LibroDetalle() {
  const { isbn } = useParams<{ isbn: string }>()

  return (
    <Container className="my-5">
      <h2>Detalle del libro</h2>
      <p>ISBN: {isbn}</p>
      <a href="/catalogo" className="btn btn-outline-secondary">Volver al catálogo</a>
    </Container>
  )
}

export default LibroDetalle