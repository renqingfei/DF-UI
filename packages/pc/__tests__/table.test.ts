import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DfTable from '../src/components/table/src/table.vue'
import DfPagination from '../src/components/pagination/src/pagination.vue'

const columns = [
  { key: 'name', title: '姓名', width: 120, fixed: 'left' as const },
  { key: 'dept', title: '部门' },
  { key: 'score', title: '绩效', sortable: true, align: 'right' as const },
  { key: 'action', title: '操作', width: 90, fixed: 'right' as const },
]

const data = [
  { id: 1, name: '张三', dept: '前端', score: 88 },
  { id: 2, name: '李四', dept: '后端', score: 95 },
  { id: 3, name: '王五', dept: '设计', score: 72 },
]

describe('Table', () => {
  it('按 columns 渲染表头，按 data 渲染行', () => {
    const wrapper = mount(DfTable, { props: { columns, data } })
    expect(wrapper.findAll('thead th')).toHaveLength(4)
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)
    expect(wrapper.findAll('thead th')[0].text()).toContain('姓名')
  })

  it('单元格默认取对应字段的值', () => {
    const wrapper = mount(DfTable, { props: { columns, data } })
    const firstRow = wrapper.findAll('tbody tr')[0].findAll('td')
    expect(firstRow[0].text()).toBe('张三')
    expect(firstRow[2].text()).toBe('88')
  })

  it('作用域插槽能自定义单元格，拿到 row 与 value', () => {
    const wrapper = mount(DfTable, {
      props: { columns, data },
      slots: { score: `<template #score="{ value }"><b class="s">{{ value }}分</b></template>` },
    })
    expect(wrapper.find('.s').text()).toBe('88分')
  })

  it('点可排序表头三态循环：升 → 降 → 不排序', async () => {
    const wrapper = mount(DfTable, { props: { columns, data } })
    const th = wrapper.findAll('thead th')[2]

    await th.trigger('click')
    expect(wrapper.emitted('sortChange')?.[0]).toEqual(['score', 'asc'])
    expect(wrapper.findAll('tbody tr')[0].findAll('td')[0].text()).toBe('王五')

    await th.trigger('click')
    expect(wrapper.emitted('sortChange')?.[1]).toEqual(['score', 'desc'])
    expect(wrapper.findAll('tbody tr')[0].findAll('td')[0].text()).toBe('李四')

    await th.trigger('click')
    expect(wrapper.emitted('sortChange')?.[2]).toEqual(['score', null])
    expect(wrapper.findAll('tbody tr')[0].findAll('td')[0].text(), '恢复原始顺序').toBe('张三')
  })

  it('不可排序的表头点了没反应', async () => {
    const wrapper = mount(DfTable, { props: { columns, data } })
    await wrapper.findAll('thead th')[1].trigger('click')
    expect(wrapper.emitted('sortChange')).toBeUndefined()
  })

  it('localSort 关掉时只抛事件，不动数据顺序', async () => {
    const wrapper = mount(DfTable, { props: { columns, data, localSort: false } })
    await wrapper.findAll('thead th')[2].trigger('click')
    expect(wrapper.emitted('sortChange')?.[0]).toEqual(['score', 'asc'])
    expect(wrapper.findAll('tbody tr')[0].findAll('td')[0].text()).toBe('张三')
  })

  it('排序不修改调用方传进来的数组', async () => {
    const original = [...data]
    const wrapper = mount(DfTable, { props: { columns, data } })
    await wrapper.findAll('thead th')[2].trigger('click')
    expect(data).toEqual(original)
  })

  it('固定列带 sticky 类名与偏移量', () => {
    const wrapper = mount(DfTable, { props: { columns, data } })
    const ths = wrapper.findAll('thead th')
    expect(ths[0].classes()).toContain('df-table__cell--fixed-left')
    expect(ths[0].attributes('style')).toContain('left: 0px')
    expect(ths[3].classes()).toContain('df-table__cell--fixed-right')
    expect(ths[3].attributes('style')).toContain('right: 0px')
  })

  it('列的对齐与宽度写进内联样式', () => {
    const wrapper = mount(DfTable, { props: { columns, data } })
    const ths = wrapper.findAll('thead th')
    expect(ths[0].attributes('style')).toContain('width: 120px')
    expect(ths[2].attributes('style')).toContain('text-align: right')
  })

  it('maxHeight 时表头固定，容器带最大高度', () => {
    const wrapper = mount(DfTable, { props: { columns, data, maxHeight: 300 } })
    expect(wrapper.classes()).toContain('is-sticky-header')
    expect(wrapper.find('.df-table__wrapper').attributes('style')).toContain('max-height: 300px')
  })

  it('没数据时显示空状态，loading 时不显示空状态', () => {
    const empty = mount(DfTable, { props: { columns, data: [], emptyText: '还没有员工' } })
    expect(empty.find('.df-table__empty').text()).toContain('还没有员工')

    const loading = mount(DfTable, { props: { columns, data: [], loading: true } })
    expect(loading.find('.df-table__empty').exists()).toBe(false)
    expect(loading.find('.df-loading').exists()).toBe(true)
  })

  it('点行抛出 rowClick', async () => {
    const wrapper = mount(DfTable, { props: { columns, data } })
    await wrapper.findAll('tbody tr')[1].trigger('click')
    expect(wrapper.emitted('rowClick')?.[0]).toEqual([data[1], 1])
  })

  it('showHeader 为 false 时不渲染表头', () => {
    const wrapper = mount(DfTable, { props: { columns, data, showHeader: false } })
    expect(wrapper.find('thead').exists()).toBe(false)
  })
})

describe('Pagination', () => {
  it('按 total 与 pageSize 算出总页数', () => {
    const wrapper = mount(DfPagination, { props: { total: 95, pageSize: 10, modelValue: 1 } })
    expect(wrapper.find('.df-pagination__jump').text()).toBe('1 / 10')
    expect(wrapper.find('.df-pagination__total').text()).toBe('共 95 条')
  })

  it('页数不多时全部列出来，不出省略号', () => {
    const wrapper = mount(DfPagination, { props: { total: 30, pageSize: 10 } })
    expect(wrapper.find('.df-pagination__ellipsis').exists()).toBe(false)
    const nums = wrapper.findAll('.df-pagination__btn').map((b) => b.text())
    expect(nums).toEqual(['‹', '1', '2', '3', '›'])
  })

  it('页数很多时首尾常驻、中间跟着当前页滑动', () => {
    const wrapper = mount(DfPagination, { props: { total: 500, pageSize: 10, modelValue: 25 } })
    const labels = wrapper.findAll('.df-pagination__btn').map((b) => b.text())
    expect(labels[1]).toBe('1')
    expect(labels[labels.length - 2]).toBe('50')
    expect(labels).toContain('25')
    expect(wrapper.findAll('.df-pagination__ellipsis')).toHaveLength(2)
  })

  it('第一页时上一页禁用，最后一页时下一页禁用', () => {
    const first = mount(DfPagination, { props: { total: 100, pageSize: 10, modelValue: 1 } })
    expect(first.findAll('.df-pagination__btn')[0].classes()).toContain('is-disabled')

    const last = mount(DfPagination, { props: { total: 100, pageSize: 10, modelValue: 10 } })
    const btns = last.findAll('.df-pagination__btn')
    expect(btns[btns.length - 1].classes()).toContain('is-disabled')
  })

  it('点页码抛出新页；点当前页不重复抛', async () => {
    const wrapper = mount(DfPagination, { props: { total: 100, pageSize: 10, modelValue: 3 } })
    const btns = wrapper.findAll('.df-pagination__btn')

    await btns[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    expect(wrapper.emitted('change')?.[0]).toEqual([2])

    await btns[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
  })

  it('上一页 / 下一页按钮可用', async () => {
    const wrapper = mount(DfPagination, { props: { total: 100, pageSize: 10, modelValue: 5 } })
    const btns = wrapper.findAll('.df-pagination__btn')

    await btns[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])

    await btns[btns.length - 1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([6])
  })

  it('disabled 时点不动', async () => {
    const wrapper = mount(DfPagination, {
      props: { total: 100, pageSize: 10, modelValue: 3, disabled: true },
    })
    await wrapper.findAll('.df-pagination__btn')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('total 为 0 时也有一页，不会出现 0 / 0', () => {
    const wrapper = mount(DfPagination, { props: { total: 0, pageSize: 10 } })
    expect(wrapper.find('.df-pagination__jump').text()).toBe('1 / 1')
  })
})
