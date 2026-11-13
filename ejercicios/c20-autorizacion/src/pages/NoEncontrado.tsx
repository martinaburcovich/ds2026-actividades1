import { Link } from 'react-router-dom'

function NoEncontrado() {
  return (
    <section className="empty-state not-found-state">
      <span aria-hidden="true">🔎</span>
      <p className="eyebrow text-eyebrow">Error 404</p>
      <h1>Esta página no existe</h1>
      <p>La dirección puede haber cambiado o el enlace ya no estar disponible.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </section>
  )
}

export default NoEncontrado
