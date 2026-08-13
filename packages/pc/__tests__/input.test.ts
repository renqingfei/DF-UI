import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DfInput from '../src/components/input/src/input.vue'
import DfTextarea from '../src/components/input/src/textarea.vue'

describe('Input', () => {
  it('显示 modelValue 并在输入时抛出 update:modelValue 与 input', async () => {
    const wrapper = mount(DfInput, { props: { modelValue: '张三' } })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('张三')

    await input.setValue('李四')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['李四'])
    expect(wrapper.emitted('input')?.[0]).toEqual(['李四'])
  })

  it('数字 0 能正常显示，不会被当成空', () => {
    const wrapper = mount(DfInput, { props: { modelValue: 0 } })
    expect(wrapper.find('input').element.value).toBe('0')
  })

  it('maxlength 按字符数截断，emoji 算一个', async () => {
    const wrapper = mount(DfInput, { props: { modelValue: '', maxlength: 3 } })
    await wrapper.find('input').setValue('🙂🙂🙂🙂🙂')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['🙂🙂🙂'])
  })

  it('trim 开启时去掉首尾空格', async () => {
    const wrapper = mount(DfInput, { props: { modelValue: '', trim: true } })
    await wrapper.find('input').setValue('  abc  ')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['abc'])
  })

  it('clearable 只在有内容且可编辑时出现', async () => {
    const empty = mount(DfInput, { props: { modelValue: '', clearable: true } })
    expect(empty.find('.df-input__clear').exists()).toBe(false)

    const filled = mount(DfInput, { props: { modelValue: 'abc', clearable: true } })
    expect(filled.find('.df-input__clear').exists()).toBe(true)

    const readonly = mount(DfInput, {
      props: { modelValue: 'abc', clearable: true, readonly: true },
    })
    expect(readonly.find('.df-input__clear').exists()).toBe(false)
  })

  it('点清空会把值置空并抛出 clear 与 change', async () => {
    const wrapper = mount(DfInput, { props: { modelValue: 'abc', clearable: true } })
    await wrapper.find('.df-input__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.emitted('change')?.[0]).toEqual([''])
  })

  it('密码框默认是密文，点显示后变明文', async () => {
    const wrapper = mount(DfInput, {
      props: { modelValue: 'secret', type: 'password', showPassword: true },
    })
    expect(wrapper.find('input').attributes('type')).toBe('password')

    await wrapper.find('.df-input__reveal').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('字数统计按 maxlength 显示', () => {
    const wrapper = mount(DfInput, {
      props: { modelValue: '你好', maxlength: 10, showCount: true },
    })
    expect(wrapper.find('.df-input__count').text()).toBe('2/10')
  })

  it('聚焦时加 is-focused，失焦移除并抛出 blur', async () => {
    const wrapper = mount(DfInput)
    const input = wrapper.find('input')

    await input.trigger('focus')
    expect(wrapper.classes()).toContain('is-focused')

    await input.trigger('blur')
    expect(wrapper.classes()).not.toContain('is-focused')
    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('回车抛出 confirm', async () => {
    const wrapper = mount(DfInput, { props: { modelValue: '搜索词' } })
    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.emitted('confirm')?.[0]).toEqual(['搜索词'])
  })

  it('size 不传时按 medium，传了跟着走', () => {
    expect(mount(DfInput).classes()).toContain('df-input--medium')
    expect(mount(DfInput, { props: { size: 'large' } }).classes()).toContain('df-input--large')
  })

  it('暴露 focus / blur 方法', async () => {
    const wrapper = mount(DfInput, { attachTo: document.body })
    const api = wrapper.vm as unknown as { focus(): void; blur(): void }
    api.focus()
    await nextTick()
    expect(document.activeElement).toBe(wrapper.find('input').element)
    api.blur()
    wrapper.unmount()
  })
})

describe('Textarea', () => {
  it('输入抛值，字数统计正常', async () => {
    const wrapper = mount(DfTextarea, {
      props: { modelValue: '', maxlength: 20, showCount: true },
    })
    await wrapper.find('textarea').setValue('一段留言')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['一段留言'])

    const filled = mount(DfTextarea, {
      props: { modelValue: '一段留言', maxlength: 20, showCount: true },
    })
    expect(filled.find('.df-textarea__count').text()).toBe('4/20')
  })

  it('rows 透传给原生 textarea', () => {
    const wrapper = mount(DfTextarea, { props: { rows: 5 } })
    expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  })

  it('autosize 时加 is-autosize，交给样式关掉手动拖拽', () => {
    expect(mount(DfTextarea, { props: { autosize: true } }).classes()).toContain('is-autosize')
    expect(mount(DfTextarea).classes()).not.toContain('is-autosize')
  })
})
