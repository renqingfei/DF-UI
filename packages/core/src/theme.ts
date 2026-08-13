import { ref, computed, readonly } from 'vue'
import { DEFAULT_THEME, getTheme, isThemeKey, themes, type DfTheme } from '@df-ui/tokens'

/**
 * 主题应用适配器。
 *
 * Web 端直接改 <html data-theme>；小程序没有 document，
 * 由 @df-ui/uni 注入自己的实现（改根组件 class 或写全局 store）。
 */
export interface ThemeAdapter {
  apply(theme: DfTheme): void
}

const webAdapter: ThemeAdapter = {
  apply(theme) {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = theme.key
    document.documentElement.style.colorScheme = theme.scheme
  },
}

const noopAdapter: ThemeAdapter = { apply: () => {} }

let adapter: ThemeAdapter = typeof document === 'undefined' ? noopAdapter : webAdapter

export function setThemeAdapter(next: ThemeAdapter): void {
  adapter = next
}

const currentKey = ref<string>(DEFAULT_THEME)

/** 当前主题对象（只读） */
export const currentTheme = computed(() => getTheme(currentKey.value))

/**
 * 切换主题。传入未注册的 key 会回退到默认主题并在开发环境告警。
 */
export function setTheme(key: string): DfTheme {
  if (!isThemeKey(key)) {
    if (import.meta.env?.DEV) {
      console.warn(
        `[df-ui] 未知主题 "${key}"，已回退到 "${DEFAULT_THEME}"。可用主题：${Object.keys(themes).join(', ')}`,
      )
    }
    key = DEFAULT_THEME
  }
  currentKey.value = key
  const theme = getTheme(key)
  adapter.apply(theme)
  return theme
}

export function getCurrentThemeKey(): string {
  return currentKey.value
}

/** 组件内读取当前主题，用于需要按明暗分支的少数场景 */
export function useTheme() {
  return {
    theme: readonly(currentTheme),
    themeKey: readonly(currentKey),
    isDark: computed(() => currentTheme.value.scheme === 'dark'),
    setTheme,
  }
}
