import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige cualquier petición que empiece con /api al backend
      '/api': {
        target: 'http://localhost:5000', // La URL de tu servidor de Node.js
        changeOrigin: true,
        secure: false,
      },
    },
  },
})