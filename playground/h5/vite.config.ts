import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const abs = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 数组形式保证顺序：更具体的 find 必须排在前面
    alias: [
      { find: '@df-ui/h5/style', replacement: abs('../../packages/h5/src/style/index.scss') },
      { find: '@df-ui/h5', replacement: abs('../../packages/h5/src/index.ts') },
      { find: '@df-ui/core', replacement: abs('../../packages/core/src/index.ts') },
      { find: '@df-ui/tokens', replacement: abs('../../packages/tokens/src/index.ts') },
    ],
  },
  server: {
    port: 5181,
    // 手机连同一个 Wi-Fi 就能直接访问，真机上看触屏手感
    host: true,
  },
})
