import type { App } from 'vue'
import { setTheme } from '@df-ui/core'
import { DEFAULT_THEME, type DfThemeKey } from '@df-ui/tokens'
import { installWebScrollLock } from './scroll-lock'
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
import { DfPopup } from './components/popup'
import { DfDialog } from './components/dialog'
import { DfLoading } from './components/loading'
import { DfToastComponent } from './components/toast'
import { DfSelect } from './components/select'
import { DfTabs } from './components/tabs'
import { DfTable } from './components/table'
import { DfPagination } from './components/pagination'
import { DfRow, DfCol } from './components/layout'

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
export * from './components/popup'
export * from './components/dialog'
export * from './components/loading'
export * from './components/toast'
export * from './components/select'
export * from './components/tabs'
export * from './components/table'
export * from './components/pagination'
export * from './components/layout'
export { webScrollLock, installWebScrollLock } from './scroll-lock'

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
  DfPopup,
  DfDialog,
  DfLoading,
  DfToastComponent,
  DfSelect,
  DfTabs,
  DfTable,
  DfPagination,
  DfRow,
  DfCol,
]

export interface DfUIOptions {
  /** 初始主题，默认 clay（黏土软糖） */
  theme?: DfThemeKey | string
}

export function install(app: App, options: DfUIOptions = {}): void {
  installWebScrollLock()
  setTheme(options.theme ?? DEFAULT_THEME)
  for (const c of components) {
    app.use(c)
  }
}

export default { install }




