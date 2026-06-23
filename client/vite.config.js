import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    
    proxy: {
      '/api': {
        target: 'https://user-analytics-1-vts3.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
