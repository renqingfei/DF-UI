import type { App } from 'vue'
import { setTheme } from '@df-ui/core'
import { DEFAULT_THEME, type DfThemeKey } from '@df-ui/tokens'
import { DfButton } from './components/df-button'
import { DfConfigProvider } from './components/df-config-provider'
import { installUniThemeAdapter } from './theme'

export * from './components/df-button'
export { DfButton, DfConfigProvider }
export {
  installUniThemeAdapter,
  uniThemeAdapter,
  uniActiveTheme,
  uniThemeStyle,
  uniThemeClass,
} from './theme'

const components = [DfButton, DfConfigProvider]

export interface DfUIOptions {
  /** 初始主题，默认 clay（黏土软糖） */
  theme?: DfThemeKey | string
}

/**
 * 小程序端安装。
 *
 * 与 pc / h5 的区别只有一点：先把主题适配器换成不依赖 document 的版本。
 * 页面里仍需用 <df-config-provider> 包一层，CSS 变量才有落脚的地方。
 *
 * 如果走 uni_modules + easycom，组件会被自动注册，不需要调 install，
 * 但仍要在 App.vue 里调一次 installUniThemeAdapter()。
 */
export function install(app: App, options: DfUIOptions = {}): void {
  installUniThemeAdapter()
  setTheme(options.theme ?? DEFAULT_THEME)
  for (const c of components) {
    app.use(c)
  }
}

export default { install }
