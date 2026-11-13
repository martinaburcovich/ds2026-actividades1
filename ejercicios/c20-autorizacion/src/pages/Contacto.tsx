import { useState, type FormEvent } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'

function Contacto() {
  const [enviado, setEnviado] = useState(false)

  const manejarEnvio = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEnviado(true)
    event.currentTarget.reset()
  }

  return (
    <section className="contact-page">
      <Row className="g-4 align-items-stretch">
        <Col lg={5}>
          <div className="contact-intro h-100">
            <h1>Contacto</h1>
            <p>Dejanos tu mensaje y nos comunicamos con vos a la brevedad.</p>
            <div className="contact-detail"><span aria-hidden="true">📚</span><span>Estamos para ayudarte a elegir tu próxima lectura.</span></div>
          </div>
        </Col>
        <Col lg={7}>
          <div className="form-panel contact-form-panel h-100">
            {enviado && <Alert variant="success" aria-live="polite">¡Gracias! Tu mensaje quedó registrado en esta demostración.</Alert>}
            <Form onSubmit={manejarEnvio}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="contacto-nombre">Nombre</Form.Label>
                <Form.Control id="contacto-nombre" name="nombre" required placeholder="Tu nombre" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="contacto-email">Email</Form.Label>
                <Form.Control id="contacto-email" name="email" type="email" required placeholder="tu@email.com" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label htmlFor="contacto-mensaje">Mensaje</Form.Label>
                <Form.Control id="contacto-mensaje" name="mensaje" as="textarea" rows={5} required placeholder="¿En qué podemos ayudarte?" />
              </Form.Group>
              <Button type="submit" variant="primary">Enviar consulta</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default Contacto
