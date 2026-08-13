import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import {
  buttonProps,
  buttonEmits,
  inputProps,
  inputEmits,
  textareaProps,
  textareaEmits,
  formProps,
  formEmits,
  formItemProps,
  checkboxProps,
  checkboxEmits,
  checkboxGroupProps,
  checkboxGroupEmits,
  radioProps,
  radioEmits,
  radioGroupProps,
  radioGroupEmits,
  switchProps,
  switchEmits,
  skeletonProps,
  skeletonItemProps,
  cardProps,
  tagProps,
  tagEmits,
  badgeProps,
  avatarProps,
  avatarEmits,
  emptyProps,
  dividerProps,
  popupProps,
  popupEmits,
  dialogProps,
  dialogEmits,
  loadingProps,
} from '@df-ui/core'

import PcButton from '../packages/pc/src/components/button/src/button.vue'
import PcInput from '../packages/pc/src/components/input/src/input.vue'
import PcTextarea from '../packages/pc/src/components/input/src/textarea.vue'
import PcForm from '../packages/pc/src/components/form/src/form.vue'
import PcFormItem from '../packages/pc/src/components/form/src/form-item.vue'
import PcCheckbox from '../packages/pc/src/components/checkbox/src/checkbox.vue'
import PcCheckboxGroup from '../packages/pc/src/components/checkbox/src/checkbox-group.vue'
import PcRadio from '../packages/pc/src/components/radio/src/radio.vue'
import PcRadioGroup from '../packages/pc/src/components/radio/src/radio-group.vue'
import PcSwitch from '../packages/pc/src/components/switch/src/switch.vue'
import PcSkeleton from '../packages/pc/src/components/skeleton/src/skeleton.vue'
import PcSkeletonItem from '../packages/pc/src/components/skeleton/src/skeleton-item.vue'
import PcCard from '../packages/pc/src/components/card/src/card.vue'
import PcTag from '../packages/pc/src/components/tag/src/tag.vue'
import PcBadge from '../packages/pc/src/components/badge/src/badge.vue'
import PcAvatar from '../packages/pc/src/components/avatar/src/avatar.vue'
import PcEmpty from '../packages/pc/src/components/empty/src/empty.vue'
import PcDivider from '../packages/pc/src/components/divider/src/divider.vue'
import PcPopup from '../packages/pc/src/components/popup/src/popup.vue'
import PcDialog from '../packages/pc/src/components/dialog/src/dialog.vue'
import PcLoading from '../packages/pc/src/components/loading/src/loading.vue'

import H5Button from '../packages/h5/src/components/button/src/button.vue'
import H5Input from '../packages/h5/src/components/input/src/input.vue'
import H5Textarea from '../packages/h5/src/components/input/src/textarea.vue'
import H5Form from '../packages/h5/src/components/form/src/form.vue'
import H5FormItem from '../packages/h5/src/components/form/src/form-item.vue'
import H5Checkbox from '../packages/h5/src/components/checkbox/src/checkbox.vue'
import H5CheckboxGroup from '../packages/h5/src/components/checkbox/src/checkbox-group.vue'
import H5Radio from '../packages/h5/src/components/radio/src/radio.vue'
import H5RadioGroup from '../packages/h5/src/components/radio/src/radio-group.vue'
import H5Switch from '../packages/h5/src/components/switch/src/switch.vue'
import H5Skeleton from '../packages/h5/src/components/skeleton/src/skeleton.vue'
import H5SkeletonItem from '../packages/h5/src/components/skeleton/src/skeleton-item.vue'
import H5Card from '../packages/h5/src/components/card/src/card.vue'
import H5Tag from '../packages/h5/src/components/tag/src/tag.vue'
import H5Badge from '../packages/h5/src/components/badge/src/badge.vue'
import H5Avatar from '../packages/h5/src/components/avatar/src/avatar.vue'
import H5Empty from '../packages/h5/src/components/empty/src/empty.vue'
import H5Divider from '../packages/h5/src/components/divider/src/divider.vue'
import H5Popup from '../packages/h5/src/components/popup/src/popup.vue'
import H5Dialog from '../packages/h5/src/components/dialog/src/dialog.vue'
import H5Loading from '../packages/h5/src/components/loading/src/loading.vue'

import UniButton from '../packages/uni/src/components/df-button/df-button.vue'
import UniInput from '../packages/uni/src/components/df-input/df-input.vue'
import UniTextarea from '../packages/uni/src/components/df-textarea/df-textarea.vue'
import UniForm from '../packages/uni/src/components/df-form/df-form.vue'
import UniFormItem from '../packages/uni/src/components/df-form-item/df-form-item.vue'
import UniCheckbox from '../packages/uni/src/components/df-checkbox/df-checkbox.vue'
import UniCheckboxGroup from '../packages/uni/src/components/df-checkbox/df-checkbox-group.vue'
import UniRadio from '../packages/uni/src/components/df-radio/df-radio.vue'
import UniRadioGroup from '../packages/uni/src/components/df-radio/df-radio-group.vue'
import UniSwitch from '../packages/uni/src/components/df-switch/df-switch.vue'
import UniSkeleton from '../packages/uni/src/components/df-skeleton/df-skeleton.vue'
import UniSkeletonItem from '../packages/uni/src/components/df-skeleton/df-skeleton-item.vue'
import UniCard from '../packages/uni/src/components/df-card/df-card.vue'
import UniTag from '../packages/uni/src/components/df-tag/df-tag.vue'
import UniBadge from '../packages/uni/src/components/df-badge/df-badge.vue'
import UniAvatar from '../packages/uni/src/components/df-avatar/df-avatar.vue'
import UniEmpty from '../packages/uni/src/components/df-empty/df-empty.vue'
import UniDivider from '../packages/uni/src/components/df-divider/df-divider.vue'
import UniPopup from '../packages/uni/src/components/df-popup/df-popup.vue'
import UniDialog from '../packages/uni/src/components/df-dialog/df-dialog.vue'
import UniLoading from '../packages/uni/src/components/df-loading/df-loading.vue'

/**
 * 三端 API 一致性校验。
 *
 * 架构方案里最大的风险是「三端 API 走偏」：同一个 df-input 在 PC 上叫 clearable，
 * 在小程序上叫 showClear，用户就得学三遍。这个文件就是那道闸门 ——
 * 只要谁在自己端里私自重新声明一遍 props，或者少接一个属性，这里立刻红。
 *
 * 加新组件时把它登记进下面这张表就行，不用另写测试。
 */

interface Registered {
  /** 组件名，三端必须一致 */
  name: string
  /** 三端共享的 props 契约对象 */
  props: object
  /** 三端共享的 emits 契约对象，没有事件的组件写 null */
  emits: object | null
  pc: Component
  h5: Component
  uni: Component
  /** 挂载时必须给的 props（比如 Form 要 model） */
  mountProps?: Record<string, unknown>
  /** 类名对照用的属性组合 */
  classCases?: Array<Record<string, unknown>>
}

const registry: Registered[] = [
  {
    name: 'DfButton',
    props: buttonProps,
    emits: buttonEmits,
    pc: PcButton,
    h5: H5Button,
    uni: UniButton,
    classCases: [
      {},
      { type: 'primary', variant: 'soft', size: 'large', shape: 'round' },
      { type: 'danger', variant: 'text', size: 'small' },
      { block: true },
      { loading: true },
      { disabled: true },
      { shape: 'circle' },
    ],
  },
  {
    name: 'DfInput',
    props: inputProps,
    emits: inputEmits,
    pc: PcInput,
    h5: H5Input,
    uni: UniInput,
    classCases: [
      {},
      { size: 'large' },
      { size: 'small', disabled: true },
      { readonly: true },
      { modelValue: 'abc', clearable: true },
    ],
  },
  {
    name: 'DfTextarea',
    props: textareaProps,
    emits: textareaEmits,
    pc: PcTextarea,
    h5: H5Textarea,
    uni: UniTextarea,
    classCases: [{}, { autosize: true }, { disabled: true }],
  },
  {
    name: 'DfForm',
    props: formProps,
    emits: formEmits,
    pc: PcForm,
    h5: H5Form,
    uni: UniForm,
    mountProps: { model: {} },
    classCases: [{}, { labelPosition: 'left' }, { size: 'large' }],
  },
  {
    name: 'DfFormItem',
    props: formItemProps,
    emits: null,
    pc: PcFormItem,
    h5: H5FormItem,
    uni: UniFormItem,
    classCases: [{}, { label: '手机号', required: true }],
  },
  {
    name: 'DfCheckbox',
    props: checkboxProps,
    emits: checkboxEmits,
    pc: PcCheckbox,
    h5: H5Checkbox,
    uni: UniCheckbox,
    classCases: [
      {},
      { modelValue: true },
      { indeterminate: true },
      { disabled: true },
      { size: 'large' },
    ],
  },
  {
    name: 'DfCheckboxGroup',
    props: checkboxGroupProps,
    emits: checkboxGroupEmits,
    pc: PcCheckboxGroup,
    h5: H5CheckboxGroup,
    uni: UniCheckboxGroup,
    classCases: [{}, { disabled: true }, { size: 'small' }],
  },
  {
    name: 'DfRadio',
    props: radioProps,
    emits: radioEmits,
    pc: PcRadio,
    h5: H5Radio,
    uni: UniRadio,
    classCases: [{}, { value: 'a', modelValue: 'a' }, { disabled: true }, { size: 'large' }],
  },
  {
    name: 'DfRadioGroup',
    props: radioGroupProps,
    emits: radioGroupEmits,
    pc: PcRadioGroup,
    h5: H5RadioGroup,
    uni: UniRadioGroup,
    classCases: [{}, { variant: 'button' }, { disabled: true }],
  },
  {
    name: 'DfSwitch',
    props: switchProps,
    emits: switchEmits,
    pc: PcSwitch,
    h5: H5Switch,
    uni: UniSwitch,
    classCases: [{}, { modelValue: true }, { loading: true }, { disabled: true }, { size: 'large' }],
  },
  {
    name: 'DfSkeleton',
    props: skeletonProps,
    emits: null,
    pc: PcSkeleton,
    h5: H5Skeleton,
    uni: UniSkeleton,
    classCases: [
      {},
      { template: 'list', count: 2, avatar: true },
      { template: 'card' },
      { template: 'article' },
      { template: 'profile' },
      { animation: 'pulse' },
      { animation: 'none', round: false },
    ],
  },
  {
    name: 'DfSkeletonItem',
    props: skeletonItemProps,
    emits: null,
    pc: PcSkeletonItem,
    h5: H5SkeletonItem,
    uni: UniSkeletonItem,
    classCases: [{}, { variant: 'circle' }, { variant: 'image' }, { variant: 'rect' }],
  },
  {
    name: 'DfCard',
    props: cardProps,
    emits: null,
    pc: PcCard,
    h5: H5Card,
    uni: UniCard,
    classCases: [{}, { title: '订单信息' }, { shadow: 'never', divided: false }],
  },
  {
    name: 'DfTag',
    props: tagProps,
    emits: tagEmits,
    pc: PcTag,
    h5: H5Tag,
    uni: UniTag,
    classCases: [
      {},
      { type: 'success' },
      { type: 'danger', variant: 'solid' },
      { variant: 'outline', round: true },
      { size: 'small', closable: true },
    ],
  },
  {
    name: 'DfBadge',
    props: badgeProps,
    emits: null,
    pc: PcBadge,
    h5: H5Badge,
    uni: UniBadge,
    classCases: [{}],
  },
  {
    name: 'DfAvatar',
    props: avatarProps,
    emits: avatarEmits,
    pc: PcAvatar,
    h5: H5Avatar,
    uni: UniAvatar,
    classCases: [{}, { text: '张三' }, { shape: 'square', size: 'large' }, { size: 'small' }],
  },
  {
    name: 'DfEmpty',
    props: emptyProps,
    emits: null,
    pc: PcEmpty,
    h5: H5Empty,
    uni: UniEmpty,
    classCases: [{}, { image: 'search', size: 'small' }, { image: 'none' }],
  },
  {
    name: 'DfDivider',
    props: dividerProps,
    emits: null,
    pc: PcDivider,
    h5: H5Divider,
    uni: UniDivider,
    classCases: [{}, { dashed: true }, { direction: 'vertical' }, { align: 'left' }],
  },
  // 浮层类不比对根类名：Web 端根节点是 Teleport，小程序端是原地渲染的 view，
  // 结构本来就不同。真正要守住的是属性、事件与行为一致。
  {
    name: 'DfPopup',
    props: popupProps,
    emits: popupEmits,
    pc: PcPopup,
    h5: H5Popup,
    uni: UniPopup,
  },
  {
    name: 'DfDialog',
    props: dialogProps,
    emits: dialogEmits,
    pc: PcDialog,
    h5: H5Dialog,
    uni: UniDialog,
  },
  {
    name: 'DfLoading',
    props: loadingProps,
    emits: null,
    pc: PcLoading,
    h5: H5Loading,
    uni: UniLoading,
    classCases: [{}, { size: 'large' }, { overlay: true }, { fullscreen: true }, { loading: true }],
  },
]

type WithOptions = { props?: object; emits?: unknown; name?: string }

function ends(entry: Registered): Array<[string, Component]> {
  return [
    ['pc', entry.pc],
    ['h5', entry.h5],
    ['uni', entry.uni],
  ]
}

describe('三端组件契约一致', () => {
  it.each(registry.map((e) => [e.name, e] as const))(
    '%s 三端用同一份 props 对象，没人私自重新声明',
    (name, entry) => {
      for (const [end, comp] of ends(entry)) {
        expect((comp as WithOptions).props, `${end} 端的 ${name} 没有从 core 取 props`).toBe(
          entry.props,
        )
      }
    },
  )

  it.each(registry.filter((e) => e.emits).map((e) => [e.name, e] as const))(
    '%s 三端用同一份 emits 定义',
    (name, entry) => {
      for (const [end, comp] of ends(entry)) {
        expect((comp as WithOptions).emits, `${end} 端的 ${name} emits 与契约不一致`).toBe(
          entry.emits,
        )
      }
    },
  )

  it.each(registry.map((e) => [e.name, e] as const))(
    '%s 三端组件名一致，同一个标签写法通用',
    (name, entry) => {
      for (const [end, comp] of ends(entry)) {
        expect((comp as WithOptions).name, `${end} 端组件名不一致`).toBe(name)
      }
    },
  )

  it.each(registry.filter((e) => e.classCases).map((e) => [e.name, e] as const))(
    '%s 同样的属性在三端生成完全相同的根类名',
    (name, entry) => {
      for (const extra of entry.classCases ?? []) {
        const props = { ...entry.mountProps, ...extra }
        const rendered = ends(entry).map(([end, comp]) => {
          const wrapper = mount(comp, { props, slots: { default: '内容' } })
          return [end, wrapper.classes().slice().sort()] as const
        })

        const [, baseline] = rendered[0]
        for (const [end, classes] of rendered) {
          expect(
            classes,
            `${name} 在 ${end} 端、属性 ${JSON.stringify(extra)} 下类名与 pc 端不一致`,
          ).toEqual(baseline)
        }
      }
    },
  )
})

describe('三端 Button 行为一致', () => {
  const entry = registry[0]

  it('都在 loading / disabled 时拦掉点击，正常态都抛 click', async () => {
    const blockingCases: Array<Record<string, unknown>> = [{ loading: true }, { disabled: true }]

    for (const [end, comp] of ends(entry)) {
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
    for (const [end, comp] of ends(entry)) {
      const loading = mount(comp, { props: { loading: true }, slots: { default: '提交中' } })
      expect(loading.find('.df-button__spinner').exists(), `${end} 端缺少 spinner`).toBe(true)

      const withIcon = mount(comp, { slots: { icon: '+', default: '新建' } })
      expect(withIcon.find('.df-button__icon').exists(), `${end} 端缺少 icon 容器`).toBe(true)
      expect(withIcon.find('.df-button__content').exists(), `${end} 端缺少 content 容器`).toBe(true)
    }
  })
})

describe('三端 Input 行为一致', () => {
  const entry = registry[1]

  it('都把 modelValue 显示出来', () => {
    for (const [end, comp] of ends(entry)) {
      const wrapper = mount(comp, { props: { modelValue: '张三' } })
      expect(wrapper.find('input').element.value, `${end} 端没显示传入的值`).toBe('张三')
    }
  })

  it('清空按钮的出现条件一致', () => {
    for (const [end, comp] of ends(entry)) {
      const empty = mount(comp, { props: { modelValue: '', clearable: true } })
      expect(empty.find('.df-input__clear').exists(), `${end} 端空值时不该有清空按钮`).toBe(false)

      const filled = mount(comp, { props: { modelValue: 'abc', clearable: true } })
      expect(filled.find('.df-input__clear').exists(), `${end} 端有内容时该有清空按钮`).toBe(true)
    }
  })

  it('字数统计的算法一致', () => {
    for (const [end, comp] of ends(entry)) {
      const wrapper = mount(comp, {
        props: { modelValue: '你好🙂', maxlength: 10, showCount: true },
      })
      expect(wrapper.find('.df-input__count').text(), `${end} 端字数算错了`).toBe('3/10')
    }
  })
})
