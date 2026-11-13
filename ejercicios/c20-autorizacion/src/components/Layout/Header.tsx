import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Header() {
  const navigate = useNavigate()
  const { usuario, logout, tieneRol } = useAuth()

  const manejarSesion = () => {
    if (usuario) {
      logout()
      navigate('/')
      return
    }
    navigate('/login')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="site-header">
      <Container>
        <Navbar.Brand as={Link} to="/">📚 Librería</Navbar.Brand>
        <Navbar.Toggle aria-controls="navMenu" />
        <Navbar.Collapse id="navMenu">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} end to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            {tieneRol('ADMIN') && <Nav.Link as={NavLink} to="/libros/nuevo">Nuevo libro</Nav.Link>}
            {usuario && <Navbar.Text className="session-greeting ms-lg-3">Hola, {usuario.nombre} · </Navbar.Text>}
            <Nav.Link as="button" className="session-button" onClick={manejarSesion}>{usuario ? 'Salir' : 'Ingresar'}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
