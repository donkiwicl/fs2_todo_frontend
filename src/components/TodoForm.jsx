import { useState } from 'react'

const MAX_NOMBRE = 30
const MAX_DESCRIPCION = 256

export default function TodoForm({ inicial, onSubmit, onCancel, textoBoton = 'Agregar' }) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '')
  const [descripcion, setDescripcion] = useState(inicial?.descripcion ?? '')
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setErrores({ nombre: 'El nombre es obligatorio' })
      return
    }
    setEnviando(true)
    try {
      await onSubmit({
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || null,
        finalizado: inicial?.finalizado ?? false,
      })
      setErrores({})
      if (!inicial) {
        setNombre('')
        setDescripcion('')
      }
    } catch (err) {
      setErrores(err.errores ?? {})
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <input
          placeholder="¿Qué necesitas hacer?"
          value={nombre}
          maxLength={MAX_NOMBRE}
          onChange={(e) => setNombre(e.target.value)}
          aria-invalid={Boolean(errores.nombre)}
          aria-label="Nombre"
        />
        <div className="field-meta">
          <span className="field-error">{errores.nombre}</span>
          <span className="counter">{nombre.length}/{MAX_NOMBRE}</span>
        </div>
      </div>

      <div className="field">
        <textarea
          placeholder="Descripción (opcional)"
          value={descripcion}
          maxLength={MAX_DESCRIPCION}
          rows={2}
          onChange={(e) => setDescripcion(e.target.value)}
          aria-invalid={Boolean(errores.descripcion)}
          aria-label="Descripción"
        />
        <div className="field-meta">
          <span className="field-error">{errores.descripcion}</span>
          <span className="counter">{descripcion.length}/{MAX_DESCRIPCION}</span>
        </div>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Guardando…' : textoBoton}
        </button>
      </div>
    </form>
  )
}
