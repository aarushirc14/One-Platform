import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/One-Platform/',
  resolve: {
    // Order matters: `@` must not absorb `@/sample` or `@/pulse/data`.
    alias: [
      { find: '@/sample', replacement: path.resolve(__dirname, './src/mock') },
      { find: '@/pulse/data', replacement: path.resolve(__dirname, './src/pulse/mock') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
})
