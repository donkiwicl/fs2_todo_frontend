import { useState } from 'react'
import { useTodos } from '../hooks/useTodos'
import FilterBar from './FilterBar'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

export default function TodoPage({ credentials, usuario, onLogout }) {
  const { todos, cargando, error, limpiarError, crear, actualizar, alternarEstado, eliminar } = useTodos(
    credentials,
    onLogout,
  )
  const [filtro, setFiltro] = useState('todas')

  const pendientes = todos.filter((t) => !t.finalizado)
  const finalizadas = todos.filter((t) => t.finalizado)
  const visibles = { todas: todos, pendientes, finalizadas }[filtro]
  const progreso = todos.length ? Math.round((finalizadas.length / todos.length) * 100) : 0

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <h1>TODO List</h1>
          <p className="muted">
            {finalizadas.length} de {todos.length} tareas finalizadas
          </p>
        </div>
        <div className="user">
          <span className="muted">{usuario}</span>
          <button className="btn" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="progress" aria-label={`Progreso ${progreso}%`}>
        <div className="progress-bar" style={{ width: `${progreso}%` }} />
      </div>

      <section className="card">
        <TodoForm onSubmit={crear} />
      </section>

      {error && (
        <p className="alert" role="alert">
          {error}
          <button className="btn btn-ghost" onClick={limpiarError} aria-label="Cerrar">
            ✕
          </button>
        </p>
      )}

      <section className="card">
        <FilterBar
          filtro={filtro}
          onChange={setFiltro}
          conteos={{ todas: todos.length, pendientes: pendientes.length, finalizadas: finalizadas.length }}
        />
        {cargando ? (
          <p className="empty">Cargando tareas…</p>
        ) : (
          <TodoList
            todos={visibles}
            filtro={filtro}
            onToggle={alternarEstado}
            onUpdate={actualizar}
            onDelete={eliminar}
          />
        )}
      </section>
    </main>
  )
}
