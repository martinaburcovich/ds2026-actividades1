import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Form, Button, Container } from 'react-bootstrap'
import { libroSchema, type LibroValidado } from '../schemas/libroSchema'
import { apiFetch } from '../services/api'
import type { Libro } from '../types/libro'

function LibroNuevo() {
  const navigate = useNavigate()
  const [errorApi, setErrorApi] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: { disponible: true },
  })

  const onSubmit = async (data: LibroValidado) => {
    try {
      setErrorApi(null)
      await apiFetch<Libro>('/libros', { method: 'POST', body: JSON.stringify(data) })
      navigate('/catalogo')
    } catch (error) {
      setErrorApi(error instanceof Error ? error.message : 'No se pudo crear el libro')
    }
  }

  return (
    <Container className="my-5" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo libro</h2>
      {errorApi && <Alert variant="danger">{errorApi}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
          <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" {...register('precio', { valueAsNumber: true })} isInvalid={!!errors.precio} />
          <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control {...register('imagen')} isInvalid={!!errors.imagen} />
          <Form.Control.Feedback type="invalid">{errors.imagen?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ID del autor</Form.Label>
          <Form.Control type="number" {...register('autorId', { valueAsNumber: true })} isInvalid={!!errors.autorId} />
          <Form.Control.Feedback type="invalid">{errors.autorId?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Check className="mb-4" type="switch" label="Disponible" {...register('disponible')} />
        <Button type="submit" variant="dark" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Agregar libro'}
        </Button>
      </Form>
    </Container>
  )
}

export default LibroNuevo
