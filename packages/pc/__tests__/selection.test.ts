import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import DfCheckbox from '../src/components/checkbox/src/checkbox.vue'
import DfCheckboxGroup from '../src/components/checkbox/src/checkbox-group.vue'
import DfRadio from '../src/components/radio/src/radio.vue'
import DfRadioGroup from '../src/components/radio/src/radio-group.vue'
import DfSwitch from '../src/components/switch/src/switch.vue'

describe('Checkbox 单独使用', () => {
  it('点击在选中与未选中之间切换', async () => {
    const wrapper = mount(DfCheckbox, { props: { modelValue: false, label: '同意' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('支持自定义选中值，后端给 1/0 也不用业务层转换', async () => {
    const wrapper = mount(DfCheckbox, {
      props: { modelValue: 0, checkedValue: 1, uncheckedValue: 0 },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })

  it('禁用时点击无效', async () => {
    const wrapper = mount(DfCheckbox, { props: { modelValue: false, disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('半选态在未选中时才显示', () => {
    const half = mount(DfCheckbox, { props: { modelValue: false, indeterminate: true } })
    expect(half.classes()).toContain('is-indeterminate')

    const full = mount(DfCheckbox, { props: { modelValue: true, indeterminate: true } })
    expect(full.classes()).toContain('is-checked')
    expect(full.classes()).not.toContain('is-indeterminate')
  })

  it('空格键也能切换，键盘用户能操作', async () => {
    const wrapper = mount(DfCheckbox, { props: { modelValue: false } })
    await wrapper.trigger('keydown.space')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })
})

describe('CheckboxGroup', () => {
  function mountGroup(props: Record<string, unknown> = {}) {
    const value = ref<string[]>(['apple'])
    const wrapper = mount({
      components: { DfCheckboxGroup, DfCheckbox },
      setup: () => ({ value, props }),
      template: `
        <DfCheckboxGroup v-model="value" v-bind="props">
          <DfCheckbox value="apple" label="苹果" />
          <DfCheckbox value="banana" label="香蕉" />
          <DfCheckbox value="cherry" label="樱桃" />
        </DfCheckboxGroup>
      `,
    })
    return { wrapper, value }
  }

  it('组内选中状态由 group 的值决定', () => {
    const { wrapper } = mountGroup()
    const boxes = wrapper.findAllComponents(DfCheckbox)
    expect(boxes[0].classes()).toContain('is-checked')
    expect(boxes[1].classes()).not.toContain('is-checked')
  })

  it('点击追加与移除，值始终是数组', async () => {
    const { wrapper, value } = mountGroup()
    const boxes = wrapper.findAllComponents(DfCheckbox)

    await boxes[1].trigger('click')
    expect(value.value).toEqual(['apple', 'banana'])

    await boxes[0].trigger('click')
    expect(value.value).toEqual(['banana'])
  })

  it('max 达到上限后未选中的项自动禁用，已选中的仍可取消', async () => {
    const { wrapper, value } = mountGroup({ max: 2 })
    const boxes = wrapper.findAllComponents(DfCheckbox)

    await boxes[1].trigger('click')
    await nextTick()
    expect(value.value).toEqual(['apple', 'banana'])

    expect(boxes[2].classes()).toContain('is-disabled')
    await boxes[2].trigger('click')
    expect(value.value).toEqual(['apple', 'banana'])

    await boxes[0].trigger('click')
    expect(value.value).toEqual(['banana'])
  })

  it('min 达到下限后已选中的项不能再取消', async () => {
    const { wrapper, value } = mountGroup({ min: 1 })
    const boxes = wrapper.findAllComponents(DfCheckbox)

    expect(boxes[0].classes()).toContain('is-disabled')
    await boxes[0].trigger('click')
    expect(value.value).toEqual(['apple'])
  })

  it('整组禁用会传导到每一项', () => {
    const { wrapper } = mountGroup({ disabled: true })
    for (const box of wrapper.findAllComponents(DfCheckbox)) {
      expect(box.classes()).toContain('is-disabled')
    }
  })
})

describe('RadioGroup', () => {
  function mountGroup(props: Record<string, unknown> = {}) {
    const value = ref('m')
    const wrapper = mount({
      components: { DfRadioGroup, DfRadio },
      setup: () => ({ value, props }),
      template: `
        <DfRadioGroup v-model="value" v-bind="props">
          <DfRadio value="m" label="男" />
          <DfRadio value="f" label="女" />
        </DfRadioGroup>
      `,
    })
    return { wrapper, value }
  }

  it('单选：选中一个，另一个自动取消', async () => {
    const { wrapper, value } = mountGroup()
    const radios = wrapper.findAllComponents(DfRadio)
    expect(radios[0].classes()).toContain('is-checked')

    await radios[1].trigger('click')
    await nextTick()
    expect(value.value).toBe('f')
    expect(radios[0].classes()).not.toContain('is-checked')
    expect(radios[1].classes()).toContain('is-checked')
  })

  it('点已选中的项不重复抛事件', async () => {
    const { wrapper } = mountGroup()
    const group = wrapper.findComponent(DfRadioGroup)
    await wrapper.findAllComponents(DfRadio)[0].trigger('click')
    expect(group.emitted('change')).toBeUndefined()
  })

  it('button 形态把样式修饰类传给每一项', () => {
    const { wrapper } = mountGroup({ variant: 'button' })
    expect(wrapper.findComponent(DfRadioGroup).classes()).toContain('df-radio-group--button')
    expect(wrapper.findAllComponents(DfRadio)[0].classes()).toContain('df-radio--button')
  })
})

describe('Switch', () => {
  it('点击切换并抛出 change', async () => {
    const wrapper = mount(DfSwitch, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  it('支持自定义开关值', async () => {
    const wrapper = mount(DfSwitch, {
      props: { modelValue: 'N', checkedValue: 'Y', uncheckedValue: 'N' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Y'])
  })

  it('loading 时点不动', async () => {
    const wrapper = mount(DfSwitch, { props: { modelValue: false, loading: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-loading')
  })

  it('beforeChange 返回 false 就不切', async () => {
    const beforeChange = vi.fn(() => false)
    const wrapper = mount(DfSwitch, { props: { modelValue: false, beforeChange } })
    await wrapper.trigger('click')
    await nextTick()
    expect(beforeChange).toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('beforeChange 是异步的：请求成功才真的切，期间显示 loading', async () => {
    let resolveHook: (v: boolean) => void = () => {}
    const beforeChange = () =>
      new Promise<boolean>((r) => {
        resolveHook = r
      })

    const wrapper = mount(DfSwitch, { props: { modelValue: false, beforeChange } })
    void wrapper.trigger('click')
    await nextTick()
    expect(wrapper.classes(), '等服务端返回期间应显示 loading').toContain('is-loading')

    resolveHook(true)
    await nextTick()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('beforeChange 抛异常等同于不切，且不再卡在 loading', async () => {
    const beforeChange = () => Promise.reject(new Error('服务端 500'))
    const wrapper = mount(DfSwitch, { props: { modelValue: false, beforeChange } })
    await wrapper.trigger('click')
    await nextTick()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('is-loading')
  })

  it('开关内部文字随状态切换', () => {
    const off = mount(DfSwitch, {
      props: { modelValue: false, checkedText: '开', uncheckedText: '关' },
    })
    expect(off.find('.df-switch__text').text()).toBe('关')

    const on = mount(DfSwitch, {
      props: { modelValue: true, checkedText: '开', uncheckedText: '关' },
    })
    expect(on.find('.df-switch__text').text()).toBe('开')
  })
})
