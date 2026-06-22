import { Container, Row, Col } from 'react-bootstrap'
import BookCard from '../components/BookCard'

const libros = [
  { isbn: '9781338617436', titulo: 'Heartstopper Vol. 1', autor: 'Alice Oseman' },
  { isbn: '9780747532743', titulo: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling' },
  { isbn: '9780380977789', titulo: 'Coraline', autor: 'Neil Gaiman' },
  { isbn: '9780743477116', titulo: 'Romeo y Julieta', autor: 'William Shakespeare' },
  { isbn: '9780670813025', titulo: 'It', autor: 'Stephen King' },
  { isbn: '9780525478812', titulo: 'Bajo la misma estrella', autor: 'John Green' },
]

function Catalogo() {
  return (
    <Container className="my-5">
      <h2 className="mb-4">Catálogo de libros</h2>
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
  )
}

export default Catalogo