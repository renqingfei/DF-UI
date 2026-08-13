import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, reactive } from 'vue'
import DfForm from '../src/components/form/src/form.vue'
import DfFormItem from '../src/components/form/src/form-item.vue'
import DfInput from '../src/components/input/src/input.vue'

function mountLoginForm(rules: Record<string, unknown[]>) {
  const model = reactive({ phone: '', password: '' })
  const wrapper = mount(
    {
      components: { DfForm, DfFormItem, DfInput },
      setup: () => ({ model, rules }),
      template: `
        <DfForm ref="form" :model="model" :rules="rules">
          <DfFormItem prop="phone" label="手机号">
            <DfInput v-model="model.phone" />
          </DfFormItem>
          <DfFormItem prop="password" label="密码">
            <DfInput v-model="model.password" type="password" />
          </DfFormItem>
        </DfForm>
      `,
    },
    { attachTo: document.body },
  )
  const form = wrapper.findComponent(DfForm)
  return { wrapper, model, form }
}

const loginRules = {
  phone: [
    { required: true, message: '请填写手机号' },
    { type: 'phone' as const, message: '手机号格式不对' },
  ],
  password: [{ required: true, message: '请填写密码' }, { min: 6 }],
}

describe('Form 校验联动', () => {
  it('必填项为空时 validate 返回 false 并把提示显示出来', async () => {
    const { wrapper, form } = mountLoginForm(loginRules)

    const ok = await (form.vm as unknown as { validate(): Promise<boolean> }).validate()
    await nextTick()

    expect(ok).toBe(false)
    const errors = wrapper.findAll('.df-form-item__error').map((e) => e.text())
    expect(errors).toEqual(['请填写手机号', '请填写密码'])
    wrapper.unmount()
  })

  it('填对了就通过，且提示清空', async () => {
    const { wrapper, model, form } = mountLoginForm(loginRules)
    const api = form.vm as unknown as { validate(): Promise<boolean> }

    await api.validate()
    model.phone = '13800138000'
    model.password = 'secret123'
    await nextTick()

    expect(await api.validate()).toBe(true)
    await nextTick()
    expect(wrapper.findAll('.df-form-item__error').map((e) => e.text())).toEqual(['', ''])
    wrapper.unmount()
  })

  it('格式不对时报格式错，不报必填错', async () => {
    const { wrapper, model, form } = mountLoginForm(loginRules)
    model.phone = '12345'
    await nextTick()

    await (form.vm as unknown as { validate(): Promise<boolean> }).validate()
    await nextTick()

    expect(wrapper.find('.df-form-item__error').text()).toBe('手机号格式不对')
    wrapper.unmount()
  })

  it('输入框失焦会触发这一项的校验，不影响其他项', async () => {
    const { wrapper } = mountLoginForm(loginRules)

    await wrapper.findAll('input')[0].trigger('blur')
    await nextTick()
    await nextTick()

    const errors = wrapper.findAll('.df-form-item__error').map((e) => e.text())
    expect(errors[0]).toBe('请填写手机号')
    expect(errors[1]).toBe('')
    wrapper.unmount()
  })

  it('必填项的标签自动带上 is-required，用于显示红星', () => {
    const { wrapper } = mountLoginForm(loginRules)
    expect(wrapper.findAll('.df-form-item.is-required')).toHaveLength(2)
    wrapper.unmount()
  })

  it('resetFields 把值和提示一起复原', async () => {
    const { wrapper, model, form } = mountLoginForm(loginRules)
    const api = form.vm as unknown as {
      validate(): Promise<boolean>
      resetFields(): void
    }

    model.phone = '12345'
    await nextTick()
    await api.validate()
    await nextTick()
    expect(wrapper.find('.df-form-item__error').text()).not.toBe('')

    api.resetFields()
    await nextTick()

    expect(model.phone).toBe('')
    expect(wrapper.findAll('.df-form-item__error').map((e) => e.text())).toEqual(['', ''])
    wrapper.unmount()
  })

  it('clearValidate 只清提示，不动已填的值', async () => {
    const { wrapper, model, form } = mountLoginForm(loginRules)
    const api = form.vm as unknown as {
      validate(): Promise<boolean>
      clearValidate(): void
    }

    model.phone = '12345'
    await nextTick()
    await api.validate()
    await nextTick()

    api.clearValidate()
    await nextTick()

    expect(model.phone).toBe('12345')
    expect(wrapper.find('.df-form-item__error').text()).toBe('')
    wrapper.unmount()
  })

  it('validateFields 只校验点名的字段', async () => {
    const { wrapper, model, form } = mountLoginForm(loginRules)
    const api = form.vm as unknown as { validateFields(p: string[]): Promise<boolean> }

    model.password = 'secret123'
    await nextTick()

    expect(await api.validateFields(['password'])).toBe(true)
    await nextTick()
    expect(wrapper.findAll('.df-form-item__error').map((e) => e.text())).toEqual(['', ''])
    wrapper.unmount()
  })

  it('表单整体 disabled 会传导到里面的输入框', async () => {
    const model = reactive({ phone: '' })
    const wrapper = mount({
      components: { DfForm, DfFormItem, DfInput },
      setup: () => ({ model }),
      template: `
        <DfForm :model="model" disabled>
          <DfFormItem prop="phone"><DfInput v-model="model.phone" /></DfFormItem>
        </DfForm>
      `,
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })

  it('原生 submit 被拦下，不让页面刷新', async () => {
    const { wrapper } = mountLoginForm(loginRules)
    const evt = new Event('submit', { cancelable: true })
    wrapper.find('form').element.dispatchEvent(evt)
    expect(evt.defaultPrevented).toBe(true)
    wrapper.unmount()
  })
})
