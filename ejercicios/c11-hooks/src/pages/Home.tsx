import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'

const libros = [
  { isbn: '9781338617436', titulo: 'Heartstopper Vol. 1', autor: 'Alice Oseman' },
  { isbn: '9780747532743', titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling' },
  { isbn: '9780380977789', titulo: 'Coraline', autor: 'Neil Gaiman' },
  { isbn: '9780743477116', titulo: 'Romeo y Julieta', autor: 'William Shakespeare' },
  { isbn: '9780670813025', titulo: 'It', autor: 'Stephen King' },
  { isbn: '9780525478812', titulo: 'Bajo la misma estrella', autor: 'John Green' },
]

function Home() {
  return (
    <>
      <section style={{ backgroundColor: '#e8d5f5', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1>Esra es mi libreria 📚</h1>
          <p className="lead">Descubrí los mejores libros</p>
          <Link to="/catalogo" className="btn btn-dark">Ver catálogo</Link>
        </Container>
      </section>

      <Container className="my-5">
        <Row>
          {libros.map((libro) => (
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
    </>
  )
}

export default Home
