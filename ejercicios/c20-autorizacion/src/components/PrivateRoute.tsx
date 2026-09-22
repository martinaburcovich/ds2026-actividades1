import { Spinner } from 'react-bootstrap'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { Rol } from '../types/sesion'

export function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth()
  if (cargando) return <Spinner animation="border" className="m-5" />
  if (!usuario) return <Navigate to="/login" replace />
  if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />
  return <Outlet />
}
