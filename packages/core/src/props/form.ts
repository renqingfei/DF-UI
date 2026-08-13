import type { ExtractPropTypes, PropType } from 'vue'
import type { FormRule } from '../validate'
import { inputSizes, type InputSize } from './input'

/**
 * Form / FormItem 的 API 契约，三端共用。
 */

export const labelPositions = ['top', 'left'] as const
export type LabelPosition = (typeof labelPositions)[number]

export type FormRules = Record<string, FormRule[]>

export const formProps = {
  /** 被校验的数据对象 */
  model: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
  /** 字段名 → 规则数组 */
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({}),
  },
  /**
   * 标签位置。三端默认一律 top —— 默认值属于 API 契约的一部分，
   * 不允许某个端偷偷不一样。移动端想要标签在左，显式写 label-position="left"
   */
  labelPosition: {
    type: String as PropType<LabelPosition>,
    default: 'top',
    validator: (v: string) => labelPositions.includes(v as LabelPosition),
  },
  /** 标签宽度，labelPosition 为 left 时生效 */
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  /** 整个表单禁用 */
  disabled: Boolean,
  /** 统一控件尺寸，子项没单独设时继承这个 */
  size: {
    type: String as PropType<InputSize>,
    default: 'medium',
    validator: (v: string) => inputSizes.includes(v as InputSize),
  },
  /** 必填项标签前是否加红星 */
  requiredMark: {
    type: Boolean,
    default: true,
  },
  /** 是否显示错误提示文字。关掉只标红不写字 */
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const

export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
  /** 校验状态变化：字段名 + 是否通过 + 提示 */
  validate: (prop: string, valid: boolean, message: string) =>
    typeof prop === 'string' && typeof valid === 'boolean' && typeof message === 'string',
}

export type FormEmits = typeof formEmits

// —— FormItem ——

export const formItemProps = {
  /** 对应 model 里的字段名。不传则这一项不参与校验 */
  prop: String,
  label: String,
  /** 只作用于本项的规则，与 Form 上按 prop 配的规则合并 */
  rules: {
    type: Array as PropType<FormRule[]>,
    default: undefined,
  },
  /** 手动标记必填（只影响红星显示，不产生校验） */
  required: {
    type: Boolean,
    default: undefined,
  },
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  showMessage: {
    type: Boolean,
    default: undefined,
  },
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
