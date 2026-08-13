import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import DfButton from '../src/components/button/src/button.vue'

describe('DfButton', () => {
  it('渲染默认插槽内容', () => {
    const wrapper = mount(DfButton, { slots: { default: '保存' } })
    expect(wrapper.text()).toBe('保存')
    expect(wrapper.classes()).toContain('df-button')
  })

  it('按 type / variant / size / shape 生成对应类名', () => {
    const wrapper = mount(DfButton, {
      props: { type: 'primary', variant: 'soft', size: 'large', shape: 'round' },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'df-button',
        'df-button--primary',
        'df-button--soft',
        'df-button--large',
        'df-button--round',
      ]),
    )
  })

  it('shape 为 default 时不输出形状修饰类', () => {
    const wrapper = mount(DfButton)
    expect(wrapper.classes().some((c) => c === 'df-button--default')).toBe(true)
    expect(wrapper.classes()).not.toContain('df-button--round')
    expect(wrapper.classes()).not.toContain('df-button--circle')
  })

  it('点击时抛出 click 事件', async () => {
    const wrapper = mount(DfButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('disabled 时不抛出 click，且带 is-disabled 与原生 disabled', async () => {
    const wrapper = mount(DfButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('loading 时禁用点击、显示 spinner、标记 aria-busy', async () => {
    const wrapper = mount(DfButton, { props: { loading: true }, slots: { default: '提交中' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
    expect(wrapper.find('.df-button__spinner').exists()).toBe(true)
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.classes()).toContain('is-loading')
  })

  it('loading 时用 spinner 顶掉 icon 插槽', () => {
    const wrapper = mount(DfButton, {
      props: { loading: true },
      slots: { icon: () => h('i', { class: 'my-icon' }), default: '提交' },
    })
    expect(wrapper.find('.df-button__spinner').exists()).toBe(true)
    expect(wrapper.find('.my-icon').exists()).toBe(false)
  })

  it('非 loading 时渲染 icon 插槽', () => {
    const wrapper = mount(DfButton, {
      slots: { icon: () => h('i', { class: 'my-icon' }), default: '新建' },
    })
    expect(wrapper.find('.df-button__icon').exists()).toBe(true)
    expect(wrapper.find('.my-icon').exists()).toBe(true)
  })

  it('block 生成 is-block', () => {
    const wrapper = mount(DfButton, { props: { block: true } })
    expect(wrapper.classes()).toContain('is-block')
  })

  it('nativeType 透传到原生 type', () => {
    const wrapper = mount(DfButton, { props: { nativeType: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('无插槽时不渲染 content 容器', () => {
    const wrapper = mount(DfButton)
    expect(wrapper.find('.df-button__content').exists()).toBe(false)
  })

  it('disabled 时阻止事件继续冒泡', async () => {
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
})
