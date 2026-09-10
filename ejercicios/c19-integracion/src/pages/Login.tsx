import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { apiFetch } from '../services/api'
import { guardarToken } from '../services/sesion'
import { loginSchema, type LoginValidado } from '../schemas/loginSchema'
import type { Sesion } from '../types/sesion'

function Login() {
  const navigate = useNavigate()
  const [errorApi, setErrorApi] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValidado>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (datos: LoginValidado) => {
    try {
      setErrorApi(null)
      const sesion = await apiFetch<Sesion>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(datos),
      })
      guardarToken(sesion.token)
      navigate('/catalogo')
    } catch (error) {
      setErrorApi(error instanceof Error ? error.message : 'No se pudo iniciar sesión')
    }
  }

  return (
    <Container className="my-5" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Iniciar sesión</h2>
      {errorApi && <Alert variant="danger">{errorApi}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...register('email')} isInvalid={!!errors.email} />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="dark" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </Form>
    </Container>
  )
}

export default Login
