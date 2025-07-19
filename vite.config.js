// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // 🔧 Forza l'uso di Rollup in modo compatibile
    rollupOptions: {
      output: {
        manualChunks: undefined, // evita splitting aggressivo
      },
    },
  },
})
