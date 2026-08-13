import { createApp } from 'vue'
import DfUI from '@df-ui/pc'
import { allThemesCssText } from '@df-ui/tokens'
import '@df-ui/pc/style'
import './styles.css'
import App from './App.vue'

// 开发态直接由令牌生成主题变量，不依赖构建产物；
// 生产环境使用方 import '@df-ui/tokens/themes.css' 即可。
const themeStyle = document.createElement('style')
themeStyle.id = 'df-theme-vars'
themeStyle.textContent = allThemesCssText()
document.head.appendChild(themeStyle)

createApp(App).use(DfUI).mount('#app')
