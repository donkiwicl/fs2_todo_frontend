import { useCallback, useState } from 'react'
import LoginForm from './components/LoginForm'
import TodoPage from './components/TodoPage'

const SESSION_KEY = 'todo-session'

function leerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export default function App() {
  const [sesion, setSesion] = useState(leerSesion)

  const login = (credentials, usuario) => {
    const nueva = { credentials, usuario }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(nueva))
    setSesion(nueva)
  }

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setSesion(null)
  }, [])

  if (!sesion) return <LoginForm onLogin={login} />

  return <TodoPage credentials={sesion.credentials} usuario={sesion.usuario} onLogout={logout} />
}
