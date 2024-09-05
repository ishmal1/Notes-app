import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    Proxy: {
      '/api':{
        target: 'http://localhost:5000',
        Headers: {
          'content-type': 'application/js'
        }
      }
    }
  }
})
