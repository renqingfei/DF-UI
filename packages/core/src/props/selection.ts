import type { ExtractPropTypes, PropType } from 'vue'
import { inputSizes, type InputSize } from './input'

/**
 * Checkbox / Radio / Switch 的 API 契约，三端共用。
 *
 * 选择类控件的值可以不是布尔 —— 后端常给 1/0、'Y'/'N'，
 * 所以三个组件都支持自定义「选中值 / 未选中值」，省掉业务层来回转换。
 */

export type SelectionValue = string | number | boolean

const sizeProp = {
  /** 不传时继承所在 Form 的 size */
  type: String as PropType<InputSize>,
  default: undefined,
  validator: (v: string) => inputSizes.includes(v as InputSize),
} as const

// —— Checkbox ——

export const checkboxProps = {
  /** 单独使用时是选中状态；在 CheckboxGroup 里由 group 接管，这里传不传都不影响 */
  modelValue: {
    type: [Boolean, String, Number] as PropType<SelectionValue>,
    default: undefined,
  },
  /** 在 CheckboxGroup 里代表这一项的值 */
  value: {
    type: [String, Number, Boolean] as PropType<SelectionValue>,
    default: undefined,
  },
  label: String,
  disabled: Boolean,
  size: sizeProp,
  /** 半选态，常用于「全选」父节点 */
  indeterminate: Boolean,
  /** 选中时代表的值，默认 true */
  checkedValue: {
    type: [Boolean, String, Number] as PropType<SelectionValue>,
    default: true,
  },
  /** 未选中时代表的值，默认 false */
  uncheckedValue: {
    type: [Boolean, String, Number] as PropType<SelectionValue>,
    default: false,
  },
  name: String,
} as const

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export const checkboxEmits = {
  'update:modelValue': (v: SelectionValue) => v !== undefined,
  change: (v: SelectionValue) => v !== undefined,
}

export const checkboxGroupProps = {
  modelValue: {
    type: Array as PropType<SelectionValue[]>,
    default: () => [],
  },
  disabled: Boolean,
  size: sizeProp,
  /** 最多能选几个，达到上限后未选中的项自动禁用 */
  max: Number,
  /** 最少要选几个，达到下限后已选中的项不能再取消 */
  min: Number,
} as const

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export const checkboxGroupEmits = {
  'update:modelValue': (v: SelectionValue[]) => Array.isArray(v),
  change: (v: SelectionValue[]) => Array.isArray(v),
}

// —— Radio ——

export const radioProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<SelectionValue>,
    default: undefined,
  },
  /** 这一项代表的值 */
  value: {
    type: [String, Number, Boolean] as PropType<SelectionValue>,
    default: undefined,
  },
  label: String,
  disabled: Boolean,
  size: sizeProp,
  name: String,
} as const

export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioEmits = {
  'update:modelValue': (v: SelectionValue) => v !== undefined,
  change: (v: SelectionValue) => v !== undefined,
}

export const radioVariants = ['default', 'button'] as const
export type RadioVariant = (typeof radioVariants)[number]

export const radioGroupProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<SelectionValue>,
    default: undefined,
  },
  disabled: Boolean,
  size: sizeProp,
  /** button 形态就是分段控件那种连成一排的样子 */
  variant: {
    type: String as PropType<RadioVariant>,
    default: 'default',
    validator: (v: string) => radioVariants.includes(v as RadioVariant),
  },
} as const

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = {
  'update:modelValue': (v: SelectionValue) => v !== undefined,
  change: (v: SelectionValue) => v !== undefined,
}

// —— Switch ——

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<SelectionValue>,
    default: false,
  },
  disabled: Boolean,
  /** 加载中：显示转圈并禁止操作 */
  loading: Boolean,
  size: sizeProp,
  checkedValue: {
    type: [Boolean, String, Number] as PropType<SelectionValue>,
    default: true,
  },
  uncheckedValue: {
    type: [Boolean, String, Number] as PropType<SelectionValue>,
    default: false,
  },
  /** 开关内部文字，如「开 / 关」 */
  checkedText: String,
  uncheckedText: String,
  /**
   * 切换前的确认钩子。返回 false 或 reject 就不切。
   * 典型用法：点了先转圈请求服务端，成功才真的切过去。
   */
  beforeChange: Function as PropType<() => boolean | Promise<boolean>>,
  name: String,
} as const

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
  'update:modelValue': (v: SelectionValue) => v !== undefined,
  change: (v: SelectionValue) => v !== undefined,
}
