import { Alert, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SinPermiso() {
  return (
    <Container className="my-5" style={{ maxWidth: 600 }}>
      <Alert variant="warning">
        <Alert.Heading>Sin permiso</Alert.Heading>
        <p>No tenés permisos para acceder a esta página.</p>
        <Link to="/catalogo" className="btn btn-outline-dark">Volver al catálogo</Link>
      </Alert>
    </Container>
  )
}
