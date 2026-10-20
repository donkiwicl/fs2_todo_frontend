# TODO List — Frontend (Vite + React)

Interfaz web para la API [fs2_todo_backend](https://github.com/donkiwicl/fs2_todo_backend).

## Funcionalidades

- **Sección pública (solo lectura):** cualquiera puede ver las tareas y filtrarlas: todas, pendientes, finalizadas
- **Sección privada:** tras iniciar sesión se pueden crear, editar, eliminar y marcar tareas como finalizadas o pendientes
- Autenticación con JWT (`POST /api/auth/login`), token guardado en `sessionStorage` y descartado al expirar
- Validación de largo (nombre 30, descripción 256) y errores del backend por campo
- Modo claro/oscuro automático y diseño responsive

## Estructura

```
src/
├── api/todoApi.js        cliente HTTP (login y /api/todos con Bearer)
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

Abrir http://localhost:5173. Sin sesión se ve la lista en modo lectura; con **Iniciar sesión** (`admin` / `admin123`) se habilita la edición.

El frontend llama directamente al backend (`VITE_API_URL`, por defecto `http://localhost:8080` en `.env.development`).
El backend permite este origen mediante CORS (`CORS_ALLOWED_ORIGINS`).

## Build de producción

```bash
npm run build
```

Definir `VITE_API_URL` con la URL pública del backend y agregar el origen del frontend a `CORS_ALLOWED_ORIGINS` en el backend.
