import { computed, ref, type ComputedRef } from 'vue'
import { setThemeAdapter, type ThemeAdapter } from '@df-ui/core'
import { DEFAULT_THEME, getTheme, toCssVars, type DfTheme } from '@df-ui/tokens'

/**
 * 小程序端的主题适配层。
 *
 * Web 端换肤靠改 `<html data-theme>`，小程序里没有 document、也没有 html 标签，
 * 所以改成：把当前主题的 CSS 变量算成一个内联 style 对象，绑在根容器
 * `<df-config-provider>` 上，靠 CSS 变量继承往下传。
 *
 * 这样 setTheme() 在三端的调用方式完全一样，差异被关在这一个文件里。
 */

const activeTheme = ref<DfTheme>(getTheme(DEFAULT_THEME))

export const uniThemeAdapter: ThemeAdapter = {
  apply(theme) {
    activeTheme.value = theme
  },
}

/** 当前主题对象（小程序端） */
export const uniActiveTheme: ComputedRef<DfTheme> = computed(() => activeTheme.value)

/** 根容器要绑的内联样式：把令牌摊平成 --df-* 变量 */
export const uniThemeStyle: ComputedRef<Record<string, string>> = computed(() =>
  toCssVars(activeTheme.value),
)

/**
 * 根容器要绑的类名。
 *
 * 低版本小程序（微信基础库 < 2.9.2、部分支付宝/字节版本）不支持 CSS 变量，
 * 这个类名给样式表留一条按主题写死色值的兜底路径。
 */
export const uniThemeClass: ComputedRef<string> = computed(
  () => `df-theme-${activeTheme.value.key}`,
)

export function installUniThemeAdapter(): void {
  setThemeAdapter(uniThemeAdapter)
}
