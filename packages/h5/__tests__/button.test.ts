import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import DfButton from '../src/components/button/src/button.vue'

// vitest 从仓库根启动，样式约束靠读源文件来守（happy-dom 不解析 scss）
const buttonScss = readFileSync(
  resolve(process.cwd(), 'packages/h5/src/components/button/style/index.scss'),
  'utf8',
)

describe('H5 DfButton · 行为', () => {
  it('渲染默认插槽并带 df-button 类', () => {
    const wrapper = mount(DfButton, { slots: { default: '立即支付' } })
    expect(wrapper.text()).toBe('立即支付')
    expect(wrapper.classes()).toContain('df-button')
  })

  it('点击抛出 click 事件', async () => {
    const wrapper = mount(DfButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('loading 与 disabled 都拦掉点击', async () => {
    const loading = mount(DfButton, { props: { loading: true } })
    await loading.trigger('click')
    expect(loading.emitted('click')).toBeUndefined()
    expect(loading.find('.df-button__spinner').exists()).toBe(true)

    const disabled = mount(DfButton, { props: { disabled: true } })
    await disabled.trigger('click')
    expect(disabled.emitted('click')).toBeUndefined()
    expect(disabled.attributes('disabled')).toBeDefined()
  })

  it('disabled 时阻止冒泡到父级', async () => {
    const onParentClick = vi.fn()
    const wrapper = mount(
      {
        components: { DfButton },
        setup: () => ({ onParentClick }),
        template: `<div @click="onParentClick"><DfButton disabled>删除</DfButton></div>`,
      },
      { attachTo: document.body },
    )
    await wrapper.find('button').trigger('click')
    expect(onParentClick).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('icon 插槽在 loading 时被 spinner 顶掉', () => {
    const wrapper = mount(DfButton, {
      props: { loading: true },
      slots: { icon: () => h('i', { class: 'my-icon' }), default: '提交' },
    })
    expect(wrapper.find('.my-icon').exists()).toBe(false)
    expect(wrapper.find('.df-button__spinner').exists()).toBe(true)
  })
})

describe('H5 DfButton · 移动端约束', () => {
  it('尺寸只用移动端控件高度令牌，不复用桌面的 control-h-*', () => {
    expect(buttonScss).toContain('--df-m-control-h-md')
    expect(buttonScss).toContain('--df-m-control-h-sm')
    expect(buttonScss).toContain('--df-m-control-h-lg')
    expect(buttonScss, 'H5 不得引用桌面控件高度令牌').not.toMatch(/--df-control-h-/)
  })

  it('hover 态必须关在指针设备的媒体查询里', () => {
    // 触屏上裸写 :hover 会导致点完高亮黏住不消失
    const hoverBlocks = buttonScss.match(/&:hover/g) ?? []
    const guarded = buttonScss.match(/@media \(hover: hover\) and \(pointer: fine\)/g) ?? []
    expect(hoverBlocks.length).toBeGreaterThan(0)
    expect(guarded.length).toBe(1)

    const guardStart = buttonScss.indexOf('@media (hover: hover)')
    for (const match of buttonScss.matchAll(/&:hover/g)) {
      expect(match.index, '存在没被媒体查询保护的 :hover').toBeGreaterThan(guardStart)
    }
  })

  it('关掉系统点击高亮与双击缩放延迟', () => {
    expect(buttonScss).toContain('-webkit-tap-highlight-color: transparent')
    expect(buttonScss).toContain('touch-action: manipulation')
  })
})
