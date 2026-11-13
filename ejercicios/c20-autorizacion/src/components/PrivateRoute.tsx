import { Spinner } from 'react-bootstrap'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { Rol } from '../types/sesion'

export function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth()
  if (cargando) return <div className="loading-state"><Spinner animation="border" /><span>Comprobando tu sesión…</span></div>
  if (!usuario) return <Navigate to="/login" replace />
  if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />
  return <Outlet />
}
