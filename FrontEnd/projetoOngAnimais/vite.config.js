import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' //importa o plugin do Tailwind

export default defineConfig({
  plugins: [react(), tailwindcss()], //adiciona o plugin aqui
  server: {
    port: 5174,
  },
})