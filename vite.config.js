import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true, // 自动打开浏览器
    port: 8088, // 端口号设置为 8088
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      // 关键配置：让 @ 符号代表 src 目录
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
