import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/auth': { target: 'http://localhost:8001', changeOrigin: true },
      '/api/v1/users': { target: 'http://localhost:8001', changeOrigin: true },
      '/api/v1/orders': { target: 'http://localhost:8002', changeOrigin: true },
      '/api/v1/products': { target: 'http://localhost:8003', changeOrigin: true },
      '/api/v1/categories': { target: 'http://localhost:8003', changeOrigin: true },
      '/api/v1/promos': { target: 'http://localhost:8003', changeOrigin: true },
      '/api/v1/reviews': { target: 'http://localhost:8003', changeOrigin: true },
    },
  },
})
