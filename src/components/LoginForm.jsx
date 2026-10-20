import { useState } from 'react'
import { authApi } from '../api/todoApi'

export default function LoginForm({ onLogin, onCancel, aviso }) {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setError(null)
    try {
      onLogin(await authApi.login(usuario, password))
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="login">
      <form className="card login-card" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <p className="muted">Ingresa para crear, editar y eliminar tareas</p>

        {aviso && <p className="notice">{aviso}</p>}

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
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Volver a la vista pública
        </button>
      </form>
    </main>
  )
}
