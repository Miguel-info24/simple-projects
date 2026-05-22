import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Se estiver usando Tailwind v4, o plugin entra aqui
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // Necessário para o Docker expor a porta corretamente
    port: 5173,
    watch: {
      usePolling: true, // Melhora o hot reload dentro do Docker no Windows/Linux
    },
  },
})