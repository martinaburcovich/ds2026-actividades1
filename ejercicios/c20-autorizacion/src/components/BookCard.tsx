import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { Libro } from '../types/libro'

interface Props {
  libro: Libro
}

function BookCard({ libro }: Props) {
  const [meGusta, setMeGusta] = useState(false)

  return (
    <Card className="book-card h-100 border-0">
      <Card.Img
        variant="top"
        className="book-cover"
        src={libro.imagen}
        alt={libro.titulo}
      />
      <Card.Body>
        <Card.Title>{libro.titulo}</Card.Title>
        <Card.Text className="book-author">{libro.autor.nombre}</Card.Text>
        <div className="book-actions">
          <Link to={`/libros/${libro.id}`} className="btn btn-primary">Ver más</Link>
          <Button
            variant={meGusta ? 'danger' : 'outline-danger'}
            onClick={() => setMeGusta(!meGusta)}
            aria-pressed={meGusta}
          >
            {meGusta ? '❤️ Guardado' : '🤍 Me gusta'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default BookCard
