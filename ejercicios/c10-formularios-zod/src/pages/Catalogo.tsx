import { Container, Row, Col } from 'react-bootstrap'
import BookCard from '../components/BookCard'
import type { Libro } from '../App'

interface Props {
  libros: Libro[]
}

function Catalogo({ libros }: Props) {
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