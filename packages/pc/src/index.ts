import type { App } from 'vue'
import { setTheme } from '@df-ui/core'
import { DEFAULT_THEME, type DfThemeKey } from '@df-ui/tokens'
import { DfButton } from './components/button'
import { DfInput, DfTextarea } from './components/input'
import { DfForm, DfFormItem } from './components/form'
import { DfCheckbox, DfCheckboxGroup } from './components/checkbox'
import { DfRadio, DfRadioGroup } from './components/radio'
import { DfSwitch } from './components/switch'

export * from './components/button'
export * from './components/input'
export * from './components/form'
export * from './components/checkbox'
export * from './components/radio'
export * from './components/switch'

const components = [
  DfButton,
  DfInput,
  DfTextarea,
  DfForm,
  DfFormItem,
  DfCheckbox,
  DfCheckboxGroup,
  DfRadio,
  DfRadioGroup,
  DfSwitch,
]

export interface DfUIOptions {
  /** 初始主题，默认 clay（黏土软糖） */
  theme?: DfThemeKey | string
}

export function install(app: App, options: DfUIOptions = {}): void {
  setTheme(options.theme ?? DEFAULT_THEME)
  for (const c of components) {
    app.use(c)
  }
}

export default { install }
