import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import externalGlobals from 'rollup-plugin-external-globals'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import cdn from 'vite-plugin-cdn-import'

import { external, globals, modules } from './cdn.modules'

const isVisualizer = process.argv.includes('--visualizer')
const isProd = process.env.NODE_ENV === 'production'

console.log('>>>>>> isProd: ', { isProd, external, globals })

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    isVisualizer && visualizer({ open: true }),
    isProd &&
      cdn({
        modules
      })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 2888
  },
  build: {
    rollupOptions: isProd
      ? {
          external,
          plugins: [externalGlobals(globals)]
        }
      : {}
  }
})
