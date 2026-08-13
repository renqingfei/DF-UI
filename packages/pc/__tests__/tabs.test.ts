import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DfTabs from '../src/components/tabs/src/tabs.vue'

const items = [
  { label: '全部', name: 'all' },
  { label: '待付款', name: 'unpaid', badge: 3 },
  { label: '待发货', name: 'unsent', badge: true },
  { label: '已完成', name: 'done', disabled: true },
]

describe('Tabs', () => {
  it('没传 modelValue 时默认落在第一个可用项，不会一个都不高亮', () => {
    const wrapper = mount(DfTabs, { props: { items } })
    expect(wrapper.findAll('.df-tabs__item')[0].classes()).toContain('is-active')
  })

  it('点击切换并抛出 change 与 tabClick', async () => {
    const wrapper = mount(DfTabs, { props: { items, modelValue: 'all' } })
    await wrapper.findAll('.df-tabs__item')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['unpaid'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['unpaid'])
    expect(wrapper.emitted('tabClick')).toHaveLength(1)
  })

  it('点已激活的项不重复抛 change，但仍抛 tabClick', async () => {
    const wrapper = mount(DfTabs, { props: { items, modelValue: 'all' } })
    await wrapper.findAll('.df-tabs__item')[0].trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('tabClick')).toHaveLength(1)
  })

  it('禁用项点不动', async () => {
    const wrapper = mount(DfTabs, { props: { items, modelValue: 'all' } })
    const disabled = wrapper.findAll('.df-tabs__item')[3]
    expect(disabled.classes()).toContain('is-disabled')
    await disabled.trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('整体 disabled 时每一项都点不动', async () => {
    const wrapper = mount(DfTabs, { props: { items, modelValue: 'all', disabled: true } })
    await wrapper.findAll('.df-tabs__item')[1].trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('徽标：数字显示数字，true 显示小圆点，不传不显示', () => {
    const wrapper = mount(DfTabs, { props: { items } })
    const badges = wrapper.findAll('.df-tabs__badge')
    expect(badges).toHaveLength(2)
    expect(badges[0].text()).toBe('3')
    expect(badges[1].classes()).toContain('is-dot')
    expect(badges[1].text()).toBe('')
  })

  it('三种形态各有修饰类', () => {
    for (const type of ['line', 'card', 'segment'] as const) {
      expect(mount(DfTabs, { props: { items, type } }).classes()).toContain(`df-tabs--${type}`)
    }
  })

  it('equalWidth 与 scrollable 互斥：等宽时不需要横向滚动', () => {
    const scroll = mount(DfTabs, { props: { items } })
    expect(scroll.classes()).toContain('is-scrollable')

    const equal = mount(DfTabs, { props: { items, equalWidth: true } })
    expect(equal.classes()).toContain('is-equal')
    expect(equal.classes()).not.toContain('is-scrollable')
  })

  it('指示器画在每一项内部，激活项那个才可见', () => {
    const wrapper = mount(DfTabs, { props: { items, modelValue: 'unpaid' } })
    const tabs = wrapper.findAll('.df-tabs__item')
    expect(tabs[1].find('.df-tabs__indicator').exists()).toBe(true)
    expect(tabs[1].classes()).toContain('is-active')
    expect(tabs[0].classes()).not.toContain('is-active')
  })

  it('默认插槽当内容区，不给就不渲染', () => {
    expect(mount(DfTabs, { props: { items } }).find('.df-tabs__body').exists()).toBe(false)
    expect(
      mount(DfTabs, { props: { items }, slots: { default: '内容' } })
        .find('.df-tabs__body')
        .text(),
    ).toBe('内容')
  })

  it('标记 role 与 aria-selected，读屏软件能用', () => {
    const wrapper = mount(DfTabs, { props: { items, modelValue: 'unpaid' } })
    expect(wrapper.find('.df-tabs__nav').attributes('role')).toBe('tablist')
    const tabs = wrapper.findAll('.df-tabs__item')
    expect(tabs[1].attributes('aria-selected')).toBe('true')
    expect(tabs[0].attributes('aria-selected')).toBe('false')
  })
})
