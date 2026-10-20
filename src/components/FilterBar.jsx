const FILTROS = [
  { id: 'todas', etiqueta: 'Todas' },
  { id: 'pendientes', etiqueta: 'Pendientes' },
  { id: 'finalizadas', etiqueta: 'Finalizadas' },
]

export default function FilterBar({ filtro, onChange, conteos }) {
  return (
    <div className="filters" role="tablist" aria-label="Filtrar tareas">
      {FILTROS.map(({ id, etiqueta }) => (
        <button
          key={id}
          role="tab"
          aria-selected={filtro === id}
          className={`filter${filtro === id ? ' active' : ''}`}
          onClick={() => onChange(id)}
        >
          {etiqueta} <span className="badge">{conteos[id]}</span>
        </button>
      ))}
    </div>
  )
}
