import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      proxy: {
        // Redirige /api al backend para evitar problemas de CORS en desarrollo
        '/api': env.BACKEND_URL || 'http://localhost:8080',
      },
    },
  }
})
