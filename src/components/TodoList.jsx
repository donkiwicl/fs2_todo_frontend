import TodoItem from './TodoItem'

export default function TodoList({ todos, filtro, ...acciones }) {
  if (todos.length === 0) {
    const mensajes = {
      todas: 'No hay tareas todavía.',
      pendientes: 'No tienes tareas pendientes.',
      finalizadas: 'Aún no has finalizado ninguna tarea.',
    }
    return <p className="empty">{mensajes[filtro]}</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...acciones} />
      ))}
    </ul>
  )
}
