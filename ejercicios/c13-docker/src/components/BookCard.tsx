import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

interface Props {
  isbn: string
  titulo: string
  autor: string
}

function BookCard({ isbn, titulo, autor }: Props) {
  const [meGusta, setMeGusta] = useState(false)

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}
        alt={titulo}
      />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{autor}</Card.Text>
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