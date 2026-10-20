import { useCallback, useState } from 'react'
import LoginForm from './components/LoginForm'
import TodoPage from './components/TodoPage'

const SESSION_KEY = 'todo-session'

function leerSesion() {
  try {
    const sesion = JSON.parse(sessionStorage.getItem(SESSION_KEY))
    return sesion && new Date(sesion.expiraEn) > new Date() ? sesion : null
  } catch {
    return null
  }
}

function guardarSesion(sesion) {
  try {
    if (sesion) sessionStorage.setItem(SESSION_KEY, JSON.stringify(sesion))
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // Sin almacenamiento disponible la sesión dura hasta recargar la página
  }
}

export default function App() {
  const [sesion, setSesion] = useState(leerSesion)
  const [mostrarLogin, setMostrarLogin] = useState(false)
  const [aviso, setAviso] = useState(null)

  const login = ({ token, usuario, expiraEn }) => {
    const nueva = { token, usuario, expiraEn }
    guardarSesion(nueva)
    setSesion(nueva)
    setMostrarLogin(false)
    setAviso(null)
  }

  const logout = useCallback(() => {
    guardarSesion(null)
    setSesion(null)
  }, [])

  const sesionExpirada = useCallback(
    (mensaje) => {
      logout()
      setAviso(mensaje)
      setMostrarLogin(true)
    },
    [logout],
  )

  if (mostrarLogin) {
    return <LoginForm onLogin={login} onCancel={() => setMostrarLogin(false)} aviso={aviso} />
  }

  return (
    <TodoPage
      sesion={sesion}
      onLoginClick={() => setMostrarLogin(true)}
      onLogout={logout}
      onSessionExpired={sesionExpirada}
    />
  )
}
