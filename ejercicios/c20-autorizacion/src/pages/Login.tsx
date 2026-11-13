import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Form } from 'react-bootstrap'
import { loginSchema, type LoginValidado } from '../schemas/loginSchema'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [errorApi, setErrorApi] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValidado>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (datos: LoginValidado) => {
    try {
      setErrorApi(null)
      await login(datos)
      navigate('/catalogo')
    } catch (error) {
      setErrorApi(error instanceof Error ? error.message : 'No se pudo iniciar sesión')
    }
  }

  return (
    <section className="form-page">
      <div className="form-panel">
        <h1>Iniciar sesión</h1>
        <p className="form-intro">Ingresá para continuar explorando la librería.</p>
        {errorApi && <Alert variant="danger">{errorApi}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" autoComplete="email" placeholder="nombre@correo.com" {...register('email')} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" autoComplete="current-password" placeholder="Tu contraseña" {...register('password')} isInvalid={!!errors.password} />
            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </Form>
      </div>
    </section>
  )
}

export default Login
