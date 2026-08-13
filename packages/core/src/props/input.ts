import type { ExtractPropTypes, PropType } from 'vue'

/**
 * Input / Textarea 的 API 契约，三端共用。
 */

export const inputSizes = ['small', 'medium', 'large'] as const
export type InputSize = (typeof inputSizes)[number]

/** 键盘类型。移动端会据此唤起对应键盘，PC 端映射为原生 input type */
export const inputTypes = ['text', 'password', 'number', 'tel', 'email', 'url', 'search'] as const
export type InputType = (typeof inputTypes)[number]

export const inputProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
    validator: (v: string) => inputTypes.includes(v as InputType),
  },
  /** 不传时继承所在 Form 的 size，表单外单独使用时按 medium */
  size: {
    type: String as PropType<InputSize>,
    default: undefined,
    validator: (v: string) => inputSizes.includes(v as InputSize),
  },
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  /** 有内容时显示清空按钮 */
  clearable: Boolean,
  /** 密码框右侧显示「显示/隐藏」切换 */
  showPassword: Boolean,
  /** 最大输入长度 */
  maxlength: Number,
  /** 显示 已输入/上限 字数统计，需配合 maxlength */
  showCount: Boolean,
  /** 自动聚焦。移动端部分浏览器会忽略 */
  autofocus: Boolean,
  /** 输入时是否自动去掉首尾空格 */
  trim: Boolean,
  /** 表单项名称，供原生表单与小程序 form 收集 */
  name: String,
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:modelValue': (value: string | number) =>
    typeof value === 'string' || typeof value === 'number',
  /** 每次输入都触发 */
  input: (value: string | number) => typeof value === 'string' || typeof value === 'number',
  /** 值改变且失焦后触发，适合做校验与请求 */
  change: (value: string | number) => typeof value === 'string' || typeof value === 'number',
  focus: (evt: unknown) => evt !== undefined,
  blur: (evt: unknown) => evt !== undefined,
  /** 点清空按钮 */
  clear: () => true,
  /** 键盘回车 / 移动端确认键 */
  confirm: (value: string | number) => typeof value === 'string' || typeof value === 'number',
}

export type InputEmits = typeof inputEmits

// —— Textarea ——

export const textareaProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  /** 固定行数 */
  rows: {
    type: Number,
    default: 3,
  },
  /** 随内容自动增高，超过 maxRows 后才出现滚动条 */
  autosize: Boolean,
  maxRows: {
    type: Number,
    default: 8,
  },
  maxlength: Number,
  showCount: Boolean,
  trim: Boolean,
  name: String,
} as const

export type TextareaProps = ExtractPropTypes<typeof textareaProps>

export const textareaEmits = inputEmits
export type TextareaEmits = typeof textareaEmits
