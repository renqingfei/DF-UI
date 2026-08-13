import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import { buttonProps, buttonEmits } from '@df-ui/core'
import PcButton from '../packages/pc/src/components/button/src/button.vue'
import H5Button from '../packages/h5/src/components/button/src/button.vue'
import UniButton from '../packages/uni/src/components/df-button/df-button.vue'

/**
 * 三端 API 一致性校验。
 *
 * 架构方案里最大的风险是「三端 API 走偏」：同一个 df-button 在 PC 上叫 type，
 * 在小程序上叫 variant，用户就得学三遍。这个测试就是那道闸门 ——
 * 只要谁在自己端里私自重新声明一遍 props，或者少接一个属性，这里立刻红。
 */

const ends: Array<[string, Component]> = [
  ['pc', PcButton],
  ['h5', H5Button],
  ['uni', UniButton],
]

type WithOptions = { props?: Record<string, unknown>; emits?: unknown; name?: string }

function optionsOf(comp: Component): WithOptions {
  return comp as WithOptions
}

describe('三端 Button 契约一致', () => {
  it('都用同一份 props 对象，没人私自重新声明', () => {
    for (const [end, comp] of ends) {
      expect(optionsOf(comp).props, `${end} 端没有从 core 取 props`).toBe(buttonProps)
    }
  })

  it('都用同一份 emits 定义', () => {
    for (const [end, comp] of ends) {
      expect(optionsOf(comp).emits, `${end} 端的 emits 与契约不一致`).toBe(buttonEmits)
    }
  })

  it('组件名一致，三端都能写成 <df-button>', () => {
    for (const [end, comp] of ends) {
      expect(optionsOf(comp).name, `${end} 端组件名不一致`).toBe('DfButton')
    }
  })

  it('同样的属性，三端生成完全相同的类名', () => {
    const cases: Array<Record<string, unknown>> = [
      {},
      { type: 'primary', variant: 'soft', size: 'large', shape: 'round' },
      { type: 'danger', variant: 'text', size: 'small' },
      { block: true },
      { loading: true },
      { disabled: true },
      { shape: 'circle' },
    ]

    for (const props of cases) {
      const rendered = ends.map(([end, comp]) => {
        const wrapper = mount(comp, { props, slots: { default: '按钮' } })
        return [end, wrapper.classes().slice().sort()] as const
      })

      const [, baseline] = rendered[0]
      for (const [end, classes] of rendered) {
        expect(classes, `${end} 端在 ${JSON.stringify(props)} 下类名与 pc 端不一致`).toEqual(
          baseline,
        )
      }
    }
  })

  it('三端都在 loading / disabled 时拦掉点击', async () => {
    const blockingCases: Array<Record<string, unknown>> = [{ loading: true }, { disabled: true }]

    for (const [end, comp] of ends) {
      // 小程序没有 click，只有 tap；组件对外抛出的事件名仍然统一是 click
      const trigger = end === 'uni' ? 'tap' : 'click'

      for (const blocking of blockingCases) {
        const wrapper = mount(comp, { props: blocking })
        await wrapper.trigger(trigger)
        expect(
          wrapper.emitted('click'),
          `${end} 端在 ${JSON.stringify(blocking)} 下不该抛出 click`,
        ).toBeUndefined()
      }

      const ok = mount(comp)
      await ok.trigger(trigger)
      expect(ok.emitted('click'), `${end} 端正常态应抛出 click`).toHaveLength(1)
    }
  })

  it('三端的加载态与图标插槽结构一致', () => {
    for (const [end, comp] of ends) {
      const loading = mount(comp, { props: { loading: true }, slots: { default: '提交中' } })
      expect(loading.find('.df-button__spinner').exists(), `${end} 端缺少 spinner`).toBe(true)

      const withIcon = mount(comp, { slots: { icon: '+', default: '新建' } })
      expect(withIcon.find('.df-button__icon').exists(), `${end} 端缺少 icon 容器`).toBe(true)
      expect(withIcon.find('.df-button__content').exists(), `${end} 端缺少 content 容器`).toBe(true)
    }
  })
})
