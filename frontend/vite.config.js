import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      '/admin': 'http://127.0.0.1:8000',
      '/admin-base': 'http://127.0.0.1:8000',
      '/admin-login': 'http://127.0.0.1:8000',
      '/admin-logout': 'http://127.0.0.1:8000',
      '/dashboard': 'http://127.0.0.1:8000',
      '/projects/admin': 'http://127.0.0.1:8000',
      '/static': 'http://127.0.0.1:8000',
      '/media': 'http://127.0.0.1:8000',
      '/internship': 'http://127.0.0.1:8000',
      '/view-questions': 'http://127.0.0.1:8000',
      '/clients': 'http://127.0.0.1:8000',
      '/create-question': 'http://127.0.0.1:8000',
      '/save-question': 'http://127.0.0.1:8000',
      '/get-questions': 'http://127.0.0.1:8000',
      '/update-question': 'http://127.0.0.1:8000',
      '/delete-question': 'http://127.0.0.1:8000',
      '/user-profile': 'http://127.0.0.1:8000',
      '/delete-user': 'http://127.0.0.1:8000',
      '/apply': 'http://127.0.0.1:8000',
      '/client_form': 'http://127.0.0.1:8000',
      '/register/': 'http://127.0.0.1:8000',
    },
    historyApiFallback: true,
  },
  build: {
    outDir: '../Backend/static/dist',
    emptyOutDir: true,
  }
})
