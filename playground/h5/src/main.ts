import { createApp } from 'vue'
import DfUI from '@df-ui/h5'
import { setTheme } from '@df-ui/core'
import { allThemesCssText, isThemeKey } from '@df-ui/tokens'
import '@df-ui/h5/style'
import './styles.css'
import App from './App.vue'

// 开发态直接由令牌生成主题变量，不依赖构建产物
const themeStyle = document.createElement('style')
themeStyle.id = 'df-theme-vars'
themeStyle.textContent = allThemesCssText()
document.head.appendChild(themeStyle)

// 被 PC 预览页用 iframe 嵌着时，跟随外面的主题切换
window.addEventListener('message', (evt: MessageEvent) => {
  const data = evt.data as { source?: string; theme?: string } | null
  if (data?.source === 'df-ui-playground' && data.theme && isThemeKey(data.theme)) {
    setTheme(data.theme)
  }
})

createApp(App).use(DfUI).mount('#app')
