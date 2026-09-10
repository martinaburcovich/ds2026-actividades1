import { Container } from 'react-bootstrap'

function Contacto() {
  return (
    <Container className="my-5">
      <h2>Contacto</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" placeholder="Tu nombre" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="tu@email.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea className="form-control" rows={4} placeholder="Escribí tu mensaje..." />
          </div>
          <button className="btn btn-dark">Enviar</button>
        </div>
      </div>
    </Container>
  )
}

export default Contacto