import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()] as any,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './src/test/setup.ts')
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
