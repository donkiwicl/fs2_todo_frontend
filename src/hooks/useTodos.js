import { useCallback, useEffect, useState } from 'react'
import { todoApi } from '../api/todoApi'

export function useTodos(token, onUnauthorized) {
  const [todos, setTodos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const manejarError = useCallback(
    (err) => {
      if (err.status === 401) onUnauthorized(err.message)
      // Los errores de validación (400) se muestran junto a cada campo del formulario
      else if (err.status !== 400) setError(err.message)
      throw err
    },
    [onUnauthorized],
  )

  useEffect(() => {
    todoApi
      .listar()
      .then(setTodos)
      .catch((err) => {
        try {
          manejarError(err)
        } catch {
          // El error ya quedó registrado en el estado
        }
      })
      .finally(() => setCargando(false))
  }, [manejarError])

  const reemplazar = (actualizado) =>
    setTodos((actuales) => actuales.map((t) => (t.id === actualizado.id ? actualizado : t)))

  const ejecutar = async (accion) => {
    try {
      const resultado = await accion()
      setError(null)
      return resultado
    } catch (err) {
      return manejarError(err)
    }
  }

  return {
    todos,
    cargando,
    error,
    limpiarError: () => setError(null),
    crear: (todo) =>
      ejecutar(async () => {
        const creado = await todoApi.crear(token, todo)
        setTodos((actuales) => [...actuales, creado])
      }),
    actualizar: (id, todo) => ejecutar(async () => reemplazar(await todoApi.actualizar(token, id, todo))),
    alternarEstado: (todo) =>
      ejecutar(async () =>
        reemplazar(
          todo.finalizado ? await todoApi.reabrir(token, todo.id) : await todoApi.finalizar(token, todo.id),
        ),
      ),
    eliminar: (id) =>
      ejecutar(async () => {
        await todoApi.eliminar(token, id)
        setTodos((actuales) => actuales.filter((t) => t.id !== id))
      }),
  }
}
