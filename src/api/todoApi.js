const BASE_URL = `${import.meta.env.VITE_API_URL ?? ''}/api/todos`

export class ApiError extends Error {
  constructor(status, message, errores = {}) {
    super(message)
    this.status = status
    this.errores = errores
  }
}

export const encodeCredentials = (usuario, password) => btoa(`${usuario}:${password}`)

async function request(path, { credentials, method = 'GET', body } = {}) {
  const headers = {
    Authorization: `Basic ${credentials}`,
    // Evita que el navegador muestre su propio diálogo de login ante un 401
    'X-Requested-With': 'XMLHttpRequest',
  }
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (response.status === 401) {
    throw new ApiError(401, 'Usuario o contraseña incorrectos')
  }
  if (!response.ok) {
    const problem = await response.json().catch(() => ({}))
    throw new ApiError(response.status, problem.detail ?? `Error ${response.status}`, problem.errores)
  }
  return response.status === 204 ? null : response.json()
}

export const todoApi = {
  listar: (credentials, finalizado) => {
    const query = finalizado === undefined ? '' : `?finalizado=${finalizado}`
    return request(query, { credentials })
  },
  crear: (credentials, todo) => request('', { credentials, method: 'POST', body: todo }),
  actualizar: (credentials, id, todo) => request(`/${id}`, { credentials, method: 'PUT', body: todo }),
  finalizar: (credentials, id) => request(`/${id}/finalizar`, { credentials, method: 'PATCH' }),
  reabrir: (credentials, id) => request(`/${id}/reabrir`, { credentials, method: 'PATCH' }),
  eliminar: (credentials, id) => request(`/${id}`, { credentials, method: 'DELETE' }),
}
