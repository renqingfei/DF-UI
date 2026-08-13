import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const abs = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 数组形式保证顺序：更具体的 find 必须排在前面
    alias: [
      { find: '@df-ui/pc/style', replacement: abs('../../packages/pc/src/style/index.scss') },
      { find: '@df-ui/pc', replacement: abs('../../packages/pc/src/index.ts') },
      { find: '@df-ui/core', replacement: abs('../../packages/core/src/index.ts') },
      { find: '@df-ui/tokens', replacement: abs('../../packages/tokens/src/index.ts') },
    ],
  },
  server: {
    port: 5180,
    open: true,
  },
})
