import { useState } from 'react'
import { encodeCredentials, todoApi } from '../api/todoApi'

export default function LoginForm({ onLogin }) {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setError(null)
    const credentials = encodeCredentials(usuario, password)
    try {
      await todoApi.listar(credentials)
      onLogin(credentials, usuario)
    } catch (err) {
      setError(err.status === 401 ? err.message : 'No se pudo conectar con el servidor')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="login">
      <form className="card login-card" onSubmit={handleSubmit}>
        <h1>TODO List</h1>
        <p className="muted">Inicia sesión para gestionar tus tareas</p>

        <label>
          Usuario
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" required autoFocus />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="alert" role="alert">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </main>
  )
}
