import { describe, it, expect } from 'vitest'
import {
  themes,
  themeList,
  getTheme,
  isThemeKey,
  toCssVars,
  toCssText,
  allThemesCssText,
  defineTheme,
  DEFAULT_THEME,
  TOKEN_PREFIX,
} from '../src/index'

describe('主题令牌', () => {
  it('四套主题齐全，默认是黏土软糖', () => {
    expect(Object.keys(themes).sort()).toEqual(['bento', 'clay', 'muted', 'neon'])
    expect(DEFAULT_THEME).toBe('clay')
  })

  it('四套主题的令牌 key 完全一致', () => {
    const baseline = Object.keys(themes.clay.tokens).sort()
    for (const theme of themeList) {
      expect(Object.keys(theme.tokens).sort(), `主题 ${theme.key} 的令牌与基准不一致`).toEqual(
        baseline,
      )
    }
  })

  it('没有空令牌值', () => {
    for (const theme of themeList) {
      for (const [key, value] of Object.entries(theme.tokens)) {
        expect(typeof value, `${theme.key}.${key}`).toBe('string')
        expect(value.trim().length, `${theme.key}.${key} 为空`).toBeGreaterThan(0)
      }
    }
  })

  it('只有暗夜霓虹是暗色主题', () => {
    expect(themes.neon.scheme).toBe('dark')
    expect(themes.clay.scheme).toBe('light')
    expect(themes.bento.scheme).toBe('light')
    expect(themes.muted.scheme).toBe('light')
  })

  it('只有暗夜霓虹提供辉光', () => {
    expect(themes.neon.tokens['shadow-glow']).not.toBe('none')
    expect(themes.clay.tokens['shadow-glow']).toBe('none')
    expect(themes.bento.tokens['shadow-glow']).toBe('none')
    expect(themes.muted.tokens['shadow-glow']).toBe('none')
  })

  it('便当格不使用阴影分层', () => {
    const t = themes.bento.tokens
    expect(t['shadow-card']).toBe('none')
    expect(t['shadow-btn']).toBe('none')
    expect(t['shadow-ctrl']).toBe('none')
  })

  it('黏土软糖的输入类控件有内凹阴影', () => {
    expect(themes.clay.tokens['shadow-well']).toContain('inset')
  })

  it('移动端令牌不复用桌面控件高度', () => {
    for (const theme of themeList) {
      expect(theme.tokens['m-title-size']).toBeDefined()
      expect(theme.tokens['m-stat-size']).toBeDefined()
      expect(parseInt(theme.tokens['m-stat-size'])).toBeGreaterThan(30)
      expect(
        theme.tokens['m-control-h-md'],
        `主题 ${theme.key} 的移动端控件高度不该等于桌面值`,
      ).not.toBe(theme.tokens['control-h-md'])
    }
  })

  it('移动端控件高度守住 44px 最小可点区域', () => {
    for (const theme of themeList) {
      const md = parseInt(theme.tokens['m-control-h-md'])
      const lg = parseInt(theme.tokens['m-control-h-lg'])
      const sm = parseInt(theme.tokens['m-control-h-sm'])
      expect(md, `主题 ${theme.key} 的 m-control-h-md 低于 44px，手指点不准`).toBeGreaterThanOrEqual(
        44,
      )
      expect(sm).toBeLessThan(md)
      expect(lg).toBeGreaterThan(md)
    }
  })

  it('getTheme 对未知 key 回退到默认主题', () => {
    expect(getTheme('clay').key).toBe('clay')
    expect(getTheme('nope').key).toBe(DEFAULT_THEME)
  })

  it('isThemeKey 正确识别', () => {
    expect(isThemeKey('neon')).toBe(true)
    expect(isThemeKey('nope')).toBe(false)
  })

  it('toCssVars 输出带 --df- 前缀的变量', () => {
    const vars = toCssVars(themes.clay)
    expect(vars[`${TOKEN_PREFIX}color-brand`]).toBe('#7B6BFF')
    expect(Object.keys(vars).every((k) => k.startsWith(TOKEN_PREFIX))).toBe(true)
  })

  it('toCssText 生成属性选择器规则并声明 color-scheme', () => {
    const css = toCssText(themes.neon)
    expect(css.startsWith('[data-theme="neon"] {')).toBe(true)
    expect(css).toContain('color-scheme: dark;')
    expect(css).toContain('--df-color-brand: #00E5A0;')
  })

  it('allThemesCssText 额外把默认主题挂到 :root', () => {
    const css = allThemesCssText()
    expect(css).toContain(':root {')
    for (const theme of themeList) {
      expect(css).toContain(`[data-theme="${theme.key}"]`)
    }
  })

  it('defineTheme 基于内置主题派生且不污染原主题', () => {
    const custom = defineTheme('bento', {
      key: 'brand',
      name: '品牌主题',
      tokens: { 'color-brand': '#0F62FE' },
    })
    expect(custom.key).toBe('brand')
    expect(custom.tokens['color-brand']).toBe('#0F62FE')
    expect(custom.tokens['color-accent']).toBe(themes.bento.tokens['color-accent'])
    expect(themes.bento.tokens['color-brand']).toBe('#111114')
  })

  it('defineTheme 未指定 key 时生成派生名', () => {
    expect(defineTheme('clay', {}).key).toBe('clay-custom')
  })
})
