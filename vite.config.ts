import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/Stasher-Website/',
  plugins: [react()],
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, './src/domain/models'),
      '@constants': path.resolve(__dirname, './src/domain/constants.tsx'),
      '@hooks': path.resolve(__dirname, './src/application/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@features': path.resolve(__dirname, './src/presentation/features'),
    },
  },
})
