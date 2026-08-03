import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vike from 'vike/plugin'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  // Dev-only: forward /api/* to the local stasher-api process so the browser
  // sees one origin, exactly like nginx does in prod. No CORS needed anywhere.
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
  plugins: [react(), vike()],
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, './src/domain/models'),
      '@constants': path.resolve(__dirname, './src/domain/constants.tsx'),
      '@hooks': path.resolve(__dirname, './src/application/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@features': path.resolve(__dirname, './src/presentation/features'),
      '@repositories': path.resolve(__dirname, './src/infrastructure/repositories'),
    },
  },
})
