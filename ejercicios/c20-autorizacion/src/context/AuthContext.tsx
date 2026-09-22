import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { apiFetch } from '../services/api'
import { borrarToken, guardarToken, obtenerToken } from '../services/sesion'
import type { Credenciales, Rol, Sesion, Usuario } from '../types/sesion'

interface AuthContextType {
  usuario: Usuario | null
  cargando: boolean
  estaAutenticado: boolean
  tieneRol: (rol: Rol) => boolean
  login: (credenciales: Credenciales) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [cargando, setCargando] = useState(obtenerToken() !== null)

  const logout = useCallback(() => {
    borrarToken()
    setUsuario(null)
    setCargando(false)
  }, [])

  useEffect(() => {
    if (!obtenerToken()) return
    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(logout)
      .finally(() => setCargando(false))
  }, [logout])

  useEffect(() => {
    window.addEventListener('sesion-expirada', logout)
    return () => window.removeEventListener('sesion-expirada', logout)
  }, [logout])

  const login = useCallback(async (credenciales: Credenciales) => {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    })
    guardarToken(sesion.token)
    setUsuario(sesion.usuario)
  }, [])

  const value = useMemo(() => ({
    usuario,
    cargando,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login,
    logout,
  }), [cargando, login, logout, usuario])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return context
}
