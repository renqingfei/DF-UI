import type { App } from 'vue'
import { setTheme } from '@df-ui/core'
import { DEFAULT_THEME, type DfThemeKey } from '@df-ui/tokens'
import { DfButton } from './components/button'
import { DfInput, DfTextarea } from './components/input'
import { DfForm, DfFormItem } from './components/form'
import { DfCheckbox, DfCheckboxGroup } from './components/checkbox'
import { DfRadio, DfRadioGroup } from './components/radio'
import { DfSwitch } from './components/switch'
import { DfSkeleton, DfSkeletonItem } from './components/skeleton'
import { DfCard } from './components/card'
import { DfTag } from './components/tag'
import { DfBadge } from './components/badge'
import { DfAvatar } from './components/avatar'
import { DfEmpty } from './components/empty'
import { DfDivider } from './components/divider'
import { DfSpace } from './components/space'

export * from './components/button'
export * from './components/input'
export * from './components/form'
export * from './components/checkbox'
export * from './components/radio'
export * from './components/switch'
export * from './components/skeleton'
export * from './components/card'
export * from './components/tag'
export * from './components/badge'
export * from './components/avatar'
export * from './components/empty'
export * from './components/divider'
export * from './components/space'

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
  DfSkeleton,
  DfSkeletonItem,
  DfCard,
  DfTag,
  DfBadge,
  DfAvatar,
  DfEmpty,
  DfDivider,
  DfSpace,
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
