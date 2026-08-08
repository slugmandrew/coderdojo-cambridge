import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const src = (path: string) => new URL(`./src/${path}`, import.meta.url).pathname

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      App: src('App.tsx'),
      auth: src('auth'),
      components: src('components'),
      data: src('data'),
      image: src('image'),
      layout: src('layout'),
      pages: src('pages'),
      theme: src('theme.ts'),
      topics: src('topics'),
      types: src('types'),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
