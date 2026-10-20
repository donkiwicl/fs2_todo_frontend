const API_URL = `${import.meta.env.VITE_API_URL ?? ''}/api`

export class ApiError extends Error {
  constructor(status, message, errores = {}) {
    super(message)
    this.status = status
    this.errores = errores
  }
}

async function request(path, { token, method = 'GET', body } = {}) {
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, 'No se pudo conectar con el servidor')
  }

  if (!response.ok) {
    const problem = await response.json().catch(() => ({}))
    const mensaje = response.status === 401 && !problem.detail ? 'Tu sesión expiró, vuelve a ingresar' : problem.detail
    throw new ApiError(response.status, mensaje ?? `Error ${response.status}`, problem.errores)
  }
  return response.status === 204 ? null : response.json()
}

export const authApi = {
  login: (usuario, password) => request('/auth/login', { method: 'POST', body: { usuario, password } }),
}

export const todoApi = {
  // Sección pública (solo lectura)
  listar: () => request('/todos'),

  // Sección privada (requiere JWT)
  crear: (token, todo) => request('/todos', { token, method: 'POST', body: todo }),
  actualizar: (token, id, todo) => request(`/todos/${id}`, { token, method: 'PUT', body: todo }),
  finalizar: (token, id) => request(`/todos/${id}/finalizar`, { token, method: 'PATCH' }),
  reabrir: (token, id) => request(`/todos/${id}/reabrir`, { token, method: 'PATCH' }),
  eliminar: (token, id) => request(`/todos/${id}`, { token, method: 'DELETE' }),
}
