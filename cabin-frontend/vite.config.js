import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Ensure a single React instance (avoids "Invalid hook call" from react-redux, etc.)
    dedupe: ['react', 'react-dom'],
  },
})
