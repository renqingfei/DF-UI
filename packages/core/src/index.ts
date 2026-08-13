export {
  setTheme,
  setThemeAdapter,
  getCurrentThemeKey,
  currentTheme,
  useTheme,
  type ThemeAdapter,
} from './theme'

export { withInstall, type SFCWithInstall } from './install'
export { DF_PREFIX, bem } from './bem'

// —— 三端共享的组件 API 契约 ——
export {
  buttonProps,
  buttonEmits,
  buttonTypes,
  buttonVariants,
  buttonSizes,
  buttonShapes,
  type ButtonProps,
  type ButtonEmits,
  type ButtonType,
  type ButtonVariant,
  type ButtonSize,
  type ButtonShape,
} from './props/button'

// —— 三端共享的界面无关逻辑 ——
export { useButton, type UseButtonReturn } from './composables/use-button'
