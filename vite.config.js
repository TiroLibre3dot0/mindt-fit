import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    historyApiFallback: true, // 👈 fondamentale per routing in dev
  }
});
// ✅ Aggiunta configurazione per Vercel
// Vercel richiede un outputDirectory e una riscrittura per gestire il routing
// Assicurati che il tuo package.json abbia i comandi corretti per build e dev
// Aggiungi "outputDirectory": "dist" e "rewrites" se necessario