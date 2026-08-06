import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@website': path.resolve(__dirname, './src/website'),
      '@hrm': path.resolve(__dirname, './src/hrm'),
      '@assets': path.resolve(__dirname, './src/shared/assets'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      '/admin': {
        target: 'http://127.0.0.1:8000',
        bypass: (req) => {
          if (req.url && (req.url.startsWith('/admin/website') || req.url.startsWith('/website/admin'))) {
            return req.url;
          }
        }
      },
      '/admin-base': 'http://127.0.0.1:8000',
      '/admin-login': 'http://127.0.0.1:8000',
      '/admin-logout': 'http://127.0.0.1:8000',
      '/dashboard': 'http://127.0.0.1:8000',
      '/projects': {
        target: 'http://127.0.0.1:8000',
        bypass: (req) => {
          if (req.headers.accept && req.headers.accept.includes('text/html') && (req.url.startsWith('/admin/website') || req.url === '/projects/admin')) {
            return req.url;
          }
        }
      },
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
