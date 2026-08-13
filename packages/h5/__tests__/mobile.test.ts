import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DfGrid from '../src/components/grid/src/grid.vue'
import DfActionBar from '../src/components/action-bar/src/action-bar.vue'
import DfNavBar from '../src/components/nav-bar/src/nav-bar.vue'
import DfList from '../src/components/list/src/list.vue'
import DfListItem from '../src/components/list/src/list-item.vue'

const entries = [
  { label: '扫一扫', icon: '⌗', name: 'scan' },
  { label: '付款码', icon: '▤', name: 'pay', badge: 2 },
  { label: '卡包', icon: '▢', name: 'card', badge: true },
  { label: '敬请期待', icon: '⋯', name: 'soon', disabled: true },
]

describe('Grid 宫格', () => {
  it('按 columns 均分宽度', () => {
    const wrapper = mount(DfGrid, { props: { items: entries, columns: 4 } })
    expect(wrapper.findAll('.df-grid__item')).toHaveLength(4)
    expect(wrapper.find('.df-grid__item').attributes('style')).toContain('width: 25%')

    const three = mount(DfGrid, { props: { items: entries, columns: 3 } })
    expect(three.find('.df-grid__item').attributes('style')).toContain('33.33')
  })

  it('点击抛出项与下标，禁用项不抛', async () => {
    const wrapper = mount(DfGrid, { props: { items: entries } })
    const cells = wrapper.findAll('.df-grid__item')

    await cells[1].trigger('click')
    expect(wrapper.emitted('itemClick')?.[0]).toEqual([entries[1], 1])

    await cells[3].trigger('click')
    expect(wrapper.emitted('itemClick')).toHaveLength(1)
    expect(cells[3].classes()).toContain('is-disabled')
  })

  it('徽标：数字显示数字，true 显示小圆点', () => {
    const wrapper = mount(DfGrid, { props: { items: entries } })
    const badges = wrapper.findAll('.df-grid__badge')
    expect(badges).toHaveLength(2)
    expect(badges[0].text()).toBe('2')
    expect(badges[1].classes()).toContain('is-dot')
  })

  it('border 与 square 各有修饰类', () => {
    expect(mount(DfGrid, { props: { items: entries, border: true } }).classes()).toContain(
      'is-border',
    )
    expect(mount(DfGrid, { props: { items: entries, square: true } }).classes()).toContain(
      'is-square',
    )
  })
})

describe('ActionBar 底部操作栏', () => {
  it('默认固定在底部并补 safe-area', () => {
    const wrapper = mount(DfActionBar, { slots: { default: '按钮' } })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['df-action-bar', 'is-fixed', 'is-safe-area', 'is-border']),
    )
  })

  it('可以关掉固定与 safe-area', () => {
    const wrapper = mount(DfActionBar, { props: { fixed: false, safeArea: false, border: false } })
    expect(wrapper.classes()).not.toContain('is-fixed')
    expect(wrapper.classes()).not.toContain('is-safe-area')
    expect(wrapper.classes()).not.toContain('is-border')
  })
})

describe('NavBar 顶部标题栏', () => {
  it('渲染标题与返回箭头，点返回抛事件', async () => {
    const wrapper = mount(DfNavBar, { props: { title: '订单详情' } })
    expect(wrapper.find('.df-nav-bar__title').text()).toBe('订单详情')

    await wrapper.find('.df-nav-bar__back').trigger('click')
    expect(wrapper.emitted('back')).toHaveLength(1)
  })

  it('showBack 为 false 时不渲染返回', () => {
    const wrapper = mount(DfNavBar, { props: { title: '首页', showBack: false } })
    expect(wrapper.find('.df-nav-bar__back').exists()).toBe(false)
  })

  it('左右两侧结构常在，标题才能居中', () => {
    const wrapper = mount(DfNavBar, { props: { title: '标题' } })
    expect(wrapper.find('.df-nav-bar__left').exists()).toBe(true)
    expect(wrapper.find('.df-nav-bar__right').exists()).toBe(true)
  })

  it('backText 给了才显示文字', () => {
    expect(mount(DfNavBar).find('.df-nav-bar__back-text').exists()).toBe(false)
    expect(
      mount(DfNavBar, { props: { backText: '返回' } })
        .find('.df-nav-bar__back-text')
        .text(),
    ).toBe('返回')
  })
})

describe('List 列表', () => {
  it('默认是卡片形态且带分隔线', () => {
    const wrapper = mount(DfList)
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['is-card', 'is-border']))
  })

  it('ListItem 渲染标题、副标题、右侧值与箭头', () => {
    const wrapper = mount(DfListItem, {
      props: { title: '收货地址', label: '默认地址', value: '上海市浦东新区', arrow: true },
    })
    expect(wrapper.find('.df-list-item__title').text()).toBe('收货地址')
    expect(wrapper.find('.df-list-item__label').text()).toBe('默认地址')
    expect(wrapper.find('.df-list-item__value').text()).toBe('上海市浦东新区')
    expect(wrapper.find('.df-list-item__arrow').exists()).toBe(true)
  })

  it('有箭头或 clickable 就算可点', () => {
    expect(mount(DfListItem, { props: { arrow: true } }).classes()).toContain('is-clickable')
    expect(mount(DfListItem, { props: { clickable: true } }).classes()).toContain('is-clickable')
    expect(mount(DfListItem, { props: { title: '纯展示' } }).classes()).not.toContain(
      'is-clickable',
    )
  })

  it('禁用时点击不抛事件', async () => {
    const wrapper = mount(DfListItem, { props: { title: 'x', clickable: true, disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()

    const ok = mount(DfListItem, { props: { title: 'x', clickable: true } })
    await ok.trigger('click')
    expect(ok.emitted('click')).toHaveLength(1)
  })

  it('没给 label / value 时不渲染对应节点，避免空行占位', () => {
    const wrapper = mount(DfListItem, { props: { title: '只有标题' } })
    expect(wrapper.find('.df-list-item__label').exists()).toBe(false)
    expect(wrapper.find('.df-list-item__value').exists()).toBe(false)
  })
})
