import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Form, Button, InputGroup } from 'react-bootstrap'
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
    <section className="form-page">
      <div className="form-panel form-panel-wide">
        <h1>Nuevo libro</h1>
        <p className="form-intro">Completá los datos para incorporarlo al catálogo.</p>
        {errorApi && <Alert variant="danger">{errorApi}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control placeholder="Ej.: Rayuela" {...register('titulo')} isInvalid={!!errors.titulo} />
            <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" min="1" placeholder="0" {...register('precio', { valueAsNumber: true })} isInvalid={!!errors.precio} />
              <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL de la imagen</Form.Label>
            <Form.Control type="url" placeholder="https://..." {...register('imagen')} isInvalid={!!errors.imagen} />
            <Form.Control.Feedback type="invalid">{errors.imagen?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ID del autor</Form.Label>
            <Form.Control type="number" min="1" placeholder="Ej.: 1" {...register('autorId', { valueAsNumber: true })} isInvalid={!!errors.autorId} />
            <Form.Text>Usá el identificador de uno de los autores registrados.</Form.Text>
            <Form.Control.Feedback type="invalid">{errors.autorId?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Check className="mb-4" type="switch" label="Disponible para la venta" {...register('disponible')} />
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Agregar libro'}
          </Button>
        </Form>
      </div>
    </section>
  )
}

export default LibroNuevo
