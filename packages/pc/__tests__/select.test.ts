import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DfSelect from '../src/components/select/src/select.vue'

const options = [
  { label: '北京', value: 'bj' },
  { label: '上海', value: 'sh' },
  { label: '广州', value: 'gz' },
  { label: '香港', value: 'hk', disabled: true },
]

describe('Select 单选', () => {
  it('没选时显示 placeholder 并带 is-empty', () => {
    const wrapper = mount(DfSelect, { props: { options, placeholder: '选择城市' } })
    expect(wrapper.find('.df-select__text').text()).toBe('选择城市')
    expect(wrapper.classes()).toContain('is-empty')
  })

  it('选了显示对应 label，而不是 value', () => {
    const wrapper = mount(DfSelect, { props: { options, modelValue: 'sh' } })
    expect(wrapper.find('.df-select__text').text()).toBe('上海')
    expect(wrapper.classes()).not.toContain('is-empty')
  })

  it('点触发器展开面板，再点收起', async () => {
    const wrapper = mount(DfSelect, { props: { options } })
    expect(wrapper.find('.df-select__panel').exists()).toBe(false)

    await wrapper.find('.df-select__trigger').trigger('click')
    expect(wrapper.find('.df-select__panel').exists()).toBe(true)
    expect(wrapper.emitted('open')).toHaveLength(1)

    await wrapper.find('.df-select__trigger').trigger('click')
    expect(wrapper.find('.df-select__panel').exists()).toBe(false)
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('选中一项后抛值并自动收起', async () => {
    const wrapper = mount(DfSelect, { props: { options } })
    await wrapper.find('.df-select__trigger').trigger('click')
    await wrapper.findAll('.df-select__option')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['sh'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['sh'])
    await nextTick()
    expect(wrapper.find('.df-select__panel').exists(), '单选选完就该收起').toBe(false)
  })

  it('禁用项点不动', async () => {
    const wrapper = mount(DfSelect, { props: { options } })
    await wrapper.find('.df-select__trigger').trigger('click')
    await wrapper.findAll('.df-select__option')[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('整体禁用时点不开', async () => {
    const wrapper = mount(DfSelect, { props: { options, disabled: true } })
    await wrapper.find('.df-select__trigger').trigger('click')
    expect(wrapper.find('.df-select__panel').exists()).toBe(false)
  })

  it('clearable 有值时才出现，点了清空', async () => {
    expect(
      mount(DfSelect, { props: { options, clearable: true } }).find('.df-select__clear').exists(),
    ).toBe(false)

    const wrapper = mount(DfSelect, { props: { options, modelValue: 'bj', clearable: true } })
    await wrapper.find('.df-select__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('点面板外面自动收起', async () => {
    const wrapper = mount(DfSelect, { props: { options }, attachTo: document.body })
    await wrapper.find('.df-select__trigger').trigger('click')
    expect(wrapper.find('.df-select__panel').exists()).toBe(true)

    document.body.click()
    await nextTick()
    expect(wrapper.find('.df-select__panel').exists()).toBe(false)
    wrapper.unmount()
  })

  it('按 Esc 收起', async () => {
    const wrapper = mount(DfSelect, { props: { options }, attachTo: document.body })
    await wrapper.find('.df-select__trigger').trigger('click')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.find('.df-select__panel').exists()).toBe(false)
    wrapper.unmount()
  })

  it('没有选项时显示空提示', async () => {
    const wrapper = mount(DfSelect, { props: { options: [] } })
    await wrapper.find('.df-select__trigger').trigger('click')
    expect(wrapper.find('.df-select__empty').text()).toBe('暂无选项')
  })
})

describe('Select 多选', () => {
  it('值是数组，显示成顿号连接的文字', () => {
    const wrapper = mount(DfSelect, {
      props: { options, multiple: true, modelValue: ['bj', 'gz'] },
    })
    expect(wrapper.find('.df-select__text').text()).toBe('北京、广州')
    expect(wrapper.classes()).toContain('is-multiple')
  })

  it('点选追加、再点移除，面板不收起', async () => {
    const wrapper = mount(DfSelect, {
      props: { options, multiple: true, modelValue: ['bj'] },
    })
    await wrapper.find('.df-select__trigger').trigger('click')

    await wrapper.findAll('.df-select__option')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['bj', 'sh']])
    expect(wrapper.find('.df-select__panel').exists(), '多选要留着继续点').toBe(true)

    await wrapper.findAll('.df-select__option')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([[]])
  })

  it('max 到上限后未选中的项禁用，已选中的仍可取消', async () => {
    const wrapper = mount(DfSelect, {
      props: { options, multiple: true, max: 2, modelValue: ['bj', 'sh'] },
    })
    await wrapper.find('.df-select__trigger').trigger('click')

    const items = wrapper.findAll('.df-select__option')
    expect(items[2].classes()).toContain('is-disabled')
    await items[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    await items[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['sh']])
  })

  it('清空多选给的是空数组，不是空字符串', async () => {
    const wrapper = mount(DfSelect, {
      props: { options, multiple: true, modelValue: ['bj'], clearable: true },
    })
    await wrapper.find('.df-select__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
  })

  it('选中项带 is-checked 与对勾', async () => {
    const wrapper = mount(DfSelect, {
      props: { options, multiple: true, modelValue: ['sh'] },
    })
    await wrapper.find('.df-select__trigger').trigger('click')
    const items = wrapper.findAll('.df-select__option')
    expect(items[1].classes()).toContain('is-checked')
    expect(items[1].find('.df-select__check').exists()).toBe(true)
    expect(items[0].find('.df-select__check').exists()).toBe(false)
  })
})
