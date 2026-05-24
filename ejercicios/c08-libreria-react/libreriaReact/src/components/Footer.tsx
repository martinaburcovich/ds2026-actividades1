import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#212529', color: '#fff', padding: '20px 0', marginTop: '40px' }}>
      <Container className="text-center">
        <p className="mb-0">📚 Librería · Todos los derechos reservados</p>
      </Container>
    </footer>
  )
}

export default Footer