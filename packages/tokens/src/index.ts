import type { DfTheme, DfThemeKey, DfThemeTokens, DfTokenName } from './types'
import { clay } from './themes/clay'
import { neon } from './themes/neon'
import { bento } from './themes/bento'
import { muted } from './themes/muted'

export type { DfTheme, DfThemeKey, DfThemeTokens, DfTokenName, ColorScheme } from './types'
export { clay, neon, bento, muted }

/** CSS 变量前缀，所有令牌统一为 --df-* */
export const TOKEN_PREFIX = '--df-'

/** 默认主题：黏土软糖 */
export const DEFAULT_THEME: DfThemeKey = 'clay'

export const themes: Record<DfThemeKey, DfTheme> = { clay, neon, bento, muted }

export const themeList: DfTheme[] = [neon, clay, bento, muted]

export function getTheme(key: string): DfTheme {
  return themes[key as DfThemeKey] ?? themes[DEFAULT_THEME]
}

export function isThemeKey(key: string): key is DfThemeKey {
  return key in themes
}

/** 令牌名 → CSS 变量名：'color-bg' → '--df-color-bg' */
export function toCssVarName(token: DfTokenName): string {
  return `${TOKEN_PREFIX}${token}`
}

/** 主题 → CSS 变量键值对 */
export function toCssVars(theme: DfTheme): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [name, value] of Object.entries(theme.tokens)) {
    out[`${TOKEN_PREFIX}${name}`] = value
  }
  return out
}

/**
 * 主题 → CSS 文本。
 * 默认生成属性选择器规则，可通过 selector 覆盖（如生成 :root 版本）。
 */
export function toCssText(theme: DfTheme, selector = `[data-theme="${theme.key}"]`): string {
  const body = Object.entries(toCssVars(theme))
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')
  return `${selector} {\n  color-scheme: ${theme.scheme};\n${body}\n}`
}

/** 全部主题的 CSS 文本，默认主题额外挂一份到 :root 作为兜底 */
export function allThemesCssText(): string {
  const parts = themeList.map((t) => toCssText(t))
  parts.unshift(toCssText(themes[DEFAULT_THEME], ':root'))
  return `${parts.join('\n\n')}\n`
}

/**
 * 基于内置主题派生自定义主题。
 *
 * @example
 * export const brandTheme = defineTheme('bento', {
 *   key: 'brand',
 *   name: '品牌主题',
 *   tokens: { 'color-brand': '#0F62FE', 'color-accent': '#FF6B00' },
 * })
 */
export function defineTheme(
  base: DfThemeKey,
  overrides: Partial<Omit<DfTheme, 'tokens'>> & { tokens?: Partial<DfThemeTokens> },
): DfTheme {
  const source = themes[base]
  return {
    ...source,
    ...overrides,
    key: overrides.key ?? `${source.key}-custom`,
    tokens: { ...source.tokens, ...overrides.tokens },
  }
}
