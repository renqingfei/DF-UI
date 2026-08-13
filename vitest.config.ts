import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

/** 小程序内置标签：让 uni 包的模板在测试环境里被当成原生标签而不是未注册组件 */
const MINI_PROGRAM_TAGS = new Set([
  'view',
  'text',
  'scroll-view',
  'swiper',
  'swiper-item',
  'image',
  'input',
  'textarea',
  'button',
  'checkbox',
  'radio',
  'switch',
  'slider',
  'picker',
  'rich-text',
  'cover-view',
  'root-portal',
])

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag !== 'button' && MINI_PROGRAM_TAGS.has(tag),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@df-ui/tokens': fileURLToPath(new URL('./packages/tokens/src/index.ts', import.meta.url)),
      '@df-ui/core': fileURLToPath(new URL('./packages/core/src/index.ts', import.meta.url)),
      '@df-ui/pc': fileURLToPath(new URL('./packages/pc/src/index.ts', import.meta.url)),
      '@df-ui/h5': fileURLToPath(new URL('./packages/h5/src/index.ts', import.meta.url)),
      '@df-ui/uni': fileURLToPath(new URL('./packages/uni/src/index.ts', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    // 跨端一致性测试放仓库根的 __tests__ 下，单端测试放各自包内
    include: ['packages/*/__tests__/**/*.test.ts', '__tests__/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['packages/*/src/**/*.{ts,vue}'],
    },
  },
})
