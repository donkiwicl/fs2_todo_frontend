# TODO List — Frontend (Vite + React)

Interfaz web para la API [fs2_todo_backend](https://github.com/donkiwicl/fs2_todo_backend).

## Funcionalidades

- Login con HTTP Basic contra el backend (sesión guardada en `sessionStorage`)
- Listar tareas con filtros: todas, pendientes, finalizadas
- Crear, editar y eliminar tareas
- Marcar como finalizada / pendiente
- Validación de largo (nombre 30, descripción 256) y errores del backend por campo
- Modo claro/oscuro automático y diseño responsive

## Estructura

```
src/
├── api/todoApi.js        cliente HTTP de /api/todos
├── hooks/useTodos.js     estado y operaciones sobre las tareas
├── components/
│   ├── LoginForm.jsx
│   ├── TodoPage.jsx      página principal
│   ├── TodoForm.jsx      alta y edición
│   ├── TodoList.jsx
│   ├── TodoItem.jsx
│   └── FilterBar.jsx
├── App.jsx               manejo de sesión
└── index.css
```

## Ejecutar

1. Levantar el backend en `http://localhost:8080` (ver su README).
2. Instalar y arrancar el frontend:

```bash
npm install
npm run dev
```

Abrir http://localhost:5173 e ingresar con `admin` / `admin123`.

En desarrollo, Vite redirige `/api` al backend (ver `vite.config.js`), por lo que no se requiere CORS.
Para apuntar a otro backend, copiar `.env.example` a `.env` y ajustar `BACKEND_URL`.

## Build de producción

```bash
npm run build
```

Si el frontend se sirve desde un origen distinto al backend, definir `VITE_API_URL` y habilitar CORS en el backend.
