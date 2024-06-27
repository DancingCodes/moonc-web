import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";
import topLevelAwait from 'vite-plugin-top-level-await'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        topLevelAwait({
            promiseExportName: '__tla',
            promiseImportName: i => `__tla_${i}`
        })
    ],
    server: {
        // 端口号
        port: 8081,
        // 开启局域网访问
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
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
})
