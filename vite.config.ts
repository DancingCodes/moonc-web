import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
    host: '0.0.0.0',
    proxy: {
      '/dev-api': {
        // target: 'http://localhost:2999',   // 本地服务器
        target: 'https://api.moonc.love',   // 线上服务器
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, '')
      },
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
