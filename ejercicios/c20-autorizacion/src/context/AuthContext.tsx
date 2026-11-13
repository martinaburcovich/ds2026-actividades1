import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { apiFetch } from '../services/api'
import { borrarToken, guardarToken, obtenerToken } from '../services/sesion'
import type { Credenciales, Rol, Sesion, Usuario } from '../types/sesion'
import { AuthContext } from './auth-context'

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
