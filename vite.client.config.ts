import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Build the React client bundle into public/static/ so Hono can serve it.
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  },
  build: {
    outDir: 'public/static',
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/client/main.tsx'),
      output: {
        entryFileNames: 'client.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (info) => {
          if (info.name && info.name.endsWith('.css')) return 'client.css'
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    cssCodeSplit: false,
    minify: 'esbuild',
    target: 'es2020'
  }
})
