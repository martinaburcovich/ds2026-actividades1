import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import type { Libro } from '../types/libro'

type Props = Pick<Libro, 'titulo' | 'imagen' | 'autor'>

function BookCard({ titulo, imagen, autor }: Props) {
  const [meGusta, setMeGusta] = useState(false)

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imagen}
        alt={titulo}
      />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{autor.nombre}</Card.Text>
        <div className="d-flex gap-2">
          <Button variant="primary">Ver más</Button>
          <Button
            variant={meGusta ? 'danger' : 'outline-danger'}
            onClick={() => setMeGusta(!meGusta)}
          >
            {meGusta ? '❤️ Guardado' : '🤍 Me gusta'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default BookCard
