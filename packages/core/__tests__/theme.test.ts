import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setTheme, getCurrentThemeKey, currentTheme, useTheme, setThemeAdapter } from '../src/theme'
import { bem } from '../src/bem'
import { withInstall } from '../src/install'

describe('主题切换', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    setTheme('clay')
  })

  it('切换后写入 data-theme 与 color-scheme', () => {
    setTheme('neon')
    expect(document.documentElement.dataset.theme).toBe('neon')
    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(getCurrentThemeKey()).toBe('neon')
    expect(currentTheme.value.name).toBe('暗夜霓虹')
  })

  it('未知主题回退到默认并告警', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    setTheme('nope')
    expect(getCurrentThemeKey()).toBe('clay')
    warn.mockRestore()
  })

  it('useTheme 暴露 isDark', () => {
    const { isDark, setTheme: set } = useTheme()
    set('bento')
    expect(isDark.value).toBe(false)
    set('neon')
    expect(isDark.value).toBe(true)
  })

  it('可注入自定义适配器（小程序端用）', () => {
    const applied: string[] = []
    setThemeAdapter({ apply: (t) => applied.push(t.key) })
    setTheme('muted')
    expect(applied).toEqual(['muted'])
  })

  afterEach(() => {
    setThemeAdapter({
      apply(theme) {
        document.documentElement.dataset.theme = theme.key
        document.documentElement.style.colorScheme = theme.scheme
      },
    })
  })
})

describe('bem', () => {
  const b = bem('button')

  it('生成 block / element / modifier', () => {
    expect(b()).toBe('df-button')
    expect(b('icon')).toBe('df-button__icon')
    expect(b('', 'round')).toBe('df-button--round')
    expect(b('icon', 'left')).toBe('df-button__icon--left')
    expect(b.m('primary')).toBe('df-button--primary')
  })

  it('is 按条件返回状态类', () => {
    expect(b.is('active')).toBe('is-active')
    expect(b.is('active', true)).toBe('is-active')
    expect(b.is('active', false)).toBe('')
  })
})

describe('withInstall', () => {
  it('挂载 install 并按 name 注册', () => {
    const comp = withInstall({ name: 'DfDemo' })
    const registered: string[] = []
    comp.install?.({ component: (n: string) => registered.push(n) } as never)
    expect(registered).toEqual(['DfDemo'])
  })

  it('缺少 name 时抛错', () => {
    const comp = withInstall({})
    expect(() => comp.install?.({ component: () => {} } as never)).toThrow(/缺少 name/)
  })
})
