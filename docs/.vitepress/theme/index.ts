import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DfUI from '@df-ui/pc'

// 主题变量（四套主题的 CSS 变量表，由 pnpm themes:css 生成）
import '@df-ui/tokens/themes.css'
// 只要 PC 组件样式，不要 base —— 否则会接管文档站自己的页面底色
import '@df-ui/pc/style/components'
// H5 组件样式包在 .df-h5-scope 下，专供文档里的手机框
import '@df-ui/h5/style/scoped'
import './custom.css'

import DemoBlock from './components/DemoBlock.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
import PhonePreview from './components/PhonePreview.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(DfUI)
    app.component('DemoBlock', DemoBlock)
    app.component('ThemeSwitch', ThemeSwitch)
    app.component('PhonePreview', PhonePreview)
  },
} satisfies Theme
