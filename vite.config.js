import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// 根据环境设置后端地址
const backendUrl = process.env.NODE_ENV === 'production'
  ? 'https://service.qqqtx.com/api'
  : 'http://localhost:9898';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    // 定义全局变量
    __BACKEND_URL__: JSON.stringify(backendUrl)
  },
  server: {
    // 端口
    port: 10000,
    // 可以使用ip访问
    host: '0.0.0.0'
  }
})
