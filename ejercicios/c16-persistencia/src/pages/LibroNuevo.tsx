import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Button, Container } from 'react-bootstrap'
import { libroSchema, type LibroValidado } from '../schemas/libroSchema'
import type { Libro } from '../App'

interface Props {
  onAgregar: (libro: Libro) => void
}

function LibroNuevo({ onAgregar }: Props) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema),
  })

  const onSubmit = (data: LibroValidado) => {
    onAgregar(data)
    navigate('/catalogo')
  }

  return (
    <Container className="my-5" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo libro</h2>

      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            {...register('isbn')}
            isInvalid={!!errors.isbn}
            placeholder="Ej: 9781234567890"
          />
          <Form.Control.Feedback type="invalid">
            {errors.isbn?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            {...register('titulo')}
            isInvalid={!!errors.titulo}
            placeholder="Ej: Cien años de soledad"
          />
          <Form.Control.Feedback type="invalid">
            {errors.titulo?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            {...register('autor')}
            isInvalid={!!errors.autor}
            placeholder="Ej: Gabriel García Márquez"
          />
          <Form.Control.Feedback type="invalid">
            {errors.autor?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="dark">Agregar libro</Button>

      </Form>
    </Container>
  )
}

export default LibroNuevo