import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@df-ui/tokens': fileURLToPath(new URL('./packages/tokens/src/index.ts', import.meta.url)),
      '@df-ui/core': fileURLToPath(new URL('./packages/core/src/index.ts', import.meta.url)),
      '@df-ui/pc': fileURLToPath(new URL('./packages/pc/src/index.ts', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['packages/*/__tests__/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['packages/*/src/**/*.{ts,vue}'],
    },
  },
})
