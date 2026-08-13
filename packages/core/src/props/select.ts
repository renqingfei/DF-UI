import type { ExtractPropTypes, PropType } from 'vue'
import { inputSizes, type InputSize } from './input'
import type { SelectionValue } from './selection'

/**
 * Select / Picker 的 API 契约，三端共用。
 *
 * 用法一致、表现不同的典型例子：PC 端是往下展开的面板，
 * 移动端是从底部升起的选择器。属性名一个字都不差。
 */

export interface SelectOption {
  label: string
  value: SelectionValue
  disabled?: boolean
}

export const selectProps = {
  /** 单选时是一个值，多选时是数组 */
  modelValue: {
    type: [String, Number, Boolean, Array] as PropType<SelectionValue | SelectionValue[]>,
    default: undefined,
  },
  /** 选项列表。也支持用默认插槽自己写选项 */
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  multiple: Boolean,
  clearable: Boolean,
  disabled: Boolean,
  size: {
    type: String as PropType<InputSize>,
    default: undefined,
    validator: (v: string) => inputSizes.includes(v as InputSize),
  },
  /** 移动端选择器的标题栏文字；PC 端忽略 */
  title: String,
  /** 多选时最多选几个 */
  max: Number,
  name: String,
} as const

export type SelectProps = ExtractPropTypes<typeof selectProps>

export const selectEmits = {
  'update:modelValue': (v: SelectionValue | SelectionValue[]) => v !== undefined,
  change: (v: SelectionValue | SelectionValue[]) => v !== undefined,
  /** 面板展开 / 收起 */
  open: () => true,
  close: () => true,
  clear: () => true,
}
