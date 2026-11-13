import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SinPermiso() {
  return (
    <section className="form-page">
      <Alert variant="warning" className="content-alert permission-alert">
        <Alert.Heading>Sin permiso</Alert.Heading>
        <p>No tenés permisos para acceder a esta página.</p>
        <Link to="/catalogo" className="btn btn-outline-dark">Volver al catálogo</Link>
      </Alert>
    </section>
  )
}
