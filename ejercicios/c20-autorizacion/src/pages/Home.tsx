import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section style={{ backgroundColor: '#e8d5f5', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1>Esta es mi librería 📚</h1>
          <p className="lead">Descubrí los mejores libros</p>
          <Link to="/catalogo" className="btn btn-dark">Ver catálogo</Link>
        </Container>
      </section>
    </>
  )
}

export default Home
