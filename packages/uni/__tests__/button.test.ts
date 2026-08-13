import { globSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { setTheme } from '@df-ui/core'
import { DEFAULT_THEME, themes } from '@df-ui/tokens'
import DfButton from '../src/components/df-button/df-button.vue'
import DfConfigProvider from '../src/components/df-config-provider/df-config-provider.vue'
import { installUniThemeAdapter, uniThemeClass, uniThemeStyle } from '../src/theme'

// vitest 从仓库根启动，小程序写法约束靠读 SFC 源文件来守
const sfc = readFileSync(
  resolve(process.cwd(), 'packages/uni/src/components/df-button/df-button.vue'),
  'utf8',
)

describe('uni DfButton · 行为', () => {
  it('用 view / text 搭出来，而不是小程序原生 button', () => {
    const wrapper = mount(DfButton, { slots: { default: '去支付' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('view')
    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.classes()).toContain('df-button')
    expect(wrapper.text()).toBe('去支付')
  })

  it('tap 抛出 click 事件，事件名与 Web 端一致', async () => {
    const wrapper = mount(DfButton)
    await wrapper.trigger('tap')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('loading 与 disabled 拦掉 tap', async () => {
    const loading = mount(DfButton, { props: { loading: true } })
    await loading.trigger('tap')
    expect(loading.emitted('click')).toBeUndefined()
    expect(loading.find('.df-button__spinner').exists()).toBe(true)

    const disabled = mount(DfButton, { props: { disabled: true } })
    await disabled.trigger('tap')
    expect(disabled.emitted('click')).toBeUndefined()
    expect(disabled.classes()).toContain('is-disabled')
  })

  it('按下态交给小程序原生 hover-class，禁用时关掉', () => {
    const normal = mount(DfButton)
    expect(normal.attributes('hover-class')).toBe('df-button--pressed')

    const disabled = mount(DfButton, { props: { disabled: true } })
    expect(disabled.attributes('hover-class')).toBe('none')
  })
})

describe('uni DfButton · 小程序限制', () => {
  it('每个 CSS 变量都带写死兜底值，低版本小程序也有样式', () => {
    const varUses = sfc.match(/var\(--df-[a-z0-9-]+[^)]*\)/g) ?? []
    expect(varUses.length).toBeGreaterThan(5)
    for (const use of varUses) {
      expect(use, `${use} 缺少兜底值`).toMatch(/var\(--df-[a-z0-9-]+,\s*[^)]+\)/)
    }
  })

  it('全部 uni 组件的兜底值都与默认主题一致，降级后不会变成另一套配色', () => {
    const defaults = themes[DEFAULT_THEME].tokens
    const files = globSync('packages/uni/src/components/**/*.vue', { cwd: process.cwd() })
    expect(files.length, '没扫到 uni 组件文件').toBeGreaterThan(5)

    let checked = 0
    for (const file of files) {
      const source = readFileSync(resolve(process.cwd(), file), 'utf8')
      for (const [, token, fallback] of source.matchAll(/var\(--df-([a-z0-9-]+),\s*([^)]+)\)/g)) {
        const expected = defaults[token as keyof typeof defaults]
        expect(expected, `${file} 里的 --df-${token} 不存在，兜底值写错了名字`).toBeDefined()
        expect(
          fallback.trim().toLowerCase(),
          `${file} 里 --df-${token} 的兜底值与默认主题 ${DEFAULT_THEME} 不一致`,
        ).toBe(expected.toLowerCase())
        checked++
      }
    }
    expect(checked).toBeGreaterThan(20)
  })

  it('全部 uni 组件都不踩小程序的写法坑', () => {
    const files = globSync('packages/uni/src/components/**/*.vue', { cwd: process.cwd() })
    for (const file of files) {
      const source = readFileSync(resolve(process.cwd(), file), 'utf8')
      const styleAt = source.indexOf('<style')
      if (styleAt < 0) continue
      const style = source.slice(styleAt)
      expect(style, `${file} 用了小程序不支持的通配符选择器`).not.toMatch(/^\s*\*\s*\{/m)
      expect(style, `${file} 用了 flex gap，部分小程序支持不全，请改 margin`).not.toMatch(
        /^\s*gap:/m,
      )
      expect(style, `${file} 用了 rpx 定高，会在小屏缩到 44pt 以下`).not.toMatch(
        /height:\s*\d+rpx/,
      )
    }
  })

  it('触控高度用 px 而不是 rpx，保住最小可点区域', () => {
    const style = sfc.slice(sfc.indexOf('<style'))
    expect(style).not.toMatch(/height:\s*\d+rpx/)
    expect(style).toContain('--df-m-control-h-md')
  })
})

describe('uni 主题适配层', () => {
  it('setTheme 走适配器改的是内联变量，不碰 document', async () => {
    installUniThemeAdapter()
    setTheme('neon')
    await nextTick()

    expect(uniThemeClass.value).toBe('df-theme-neon')
    expect(uniThemeStyle.value['--df-color-brand']).toBe(themes.neon.tokens['color-brand'])
    // Web 适配器会写 html[data-theme]，小程序适配器必须一个字都不写
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('config-provider 把主题变量绑到根容器上', async () => {
    const wrapper = mount(DfConfigProvider, {
      props: { theme: 'bento' },
      slots: { default: '内容' },
    })
    await nextTick()

    expect(wrapper.classes()).toContain('df-app')
    expect(wrapper.classes()).toContain('df-theme-bento')
    expect(wrapper.attributes('data-theme')).toBe('bento')
    expect(wrapper.attributes('style')).toContain('--df-color-brand')
  })
})
