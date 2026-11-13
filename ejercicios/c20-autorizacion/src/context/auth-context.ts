import { createContext } from 'react'
import type { Credenciales, Rol, Usuario } from '../types/sesion'

export interface AuthContextType {
  usuario: Usuario | null
  cargando: boolean
  estaAutenticado: boolean
  tieneRol: (rol: Rol) => boolean
  login: (credenciales: Credenciales) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
