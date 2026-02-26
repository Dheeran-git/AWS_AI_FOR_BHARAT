import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Sarathi — Welfare Intelligence',
        short_name: 'Sarathi',
        description: 'AI-powered welfare delivery for every Indian',
        theme_color: '#1e3a5f',
        background_color: '#f8fafc',
        icons: [
          { src: '/sarathi-logo.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
