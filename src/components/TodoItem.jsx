import { useState } from 'react'
import TodoForm from './TodoForm'

export default function TodoItem({ todo, editable, onToggle, onUpdate, onDelete }) {
  const [editando, setEditando] = useState(false)

  if (editando) {
    return (
      <li className="todo-item editing">
        <TodoForm
          inicial={todo}
          textoBoton="Guardar"
          onCancel={() => setEditando(false)}
          onSubmit={async (datos) => {
            await onUpdate(todo.id, datos)
            setEditando(false)
          }}
        />
      </li>
    )
  }

  return (
    <li className={`todo-item${todo.finalizado ? ' done' : ''}`}>
      <input
        type="checkbox"
        className="todo-check"
        checked={todo.finalizado}
        disabled={!editable}
        onChange={() => onToggle(todo).catch(() => {})}
        aria-label={todo.finalizado ? 'Marcar como pendiente' : 'Marcar como finalizada'}
      />
      <div className="todo-body">
        <span className="todo-name">{todo.nombre}</span>
        {todo.descripcion && <p className="todo-desc">{todo.descripcion}</p>}
      </div>
      {editable && (
        <div className="todo-actions">
          <button className="btn btn-ghost" onClick={() => setEditando(true)}>
            Editar
          </button>
          <button
            className="btn btn-ghost btn-danger"
            onClick={() => {
              if (confirm(`¿Eliminar "${todo.nombre}"?`)) onDelete(todo.id).catch(() => {})
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </li>
  )
}
