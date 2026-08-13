import type { ExtractPropTypes, PropType } from 'vue'

/**
 * Button 的 props 定义独立于模板，h5 与 uni 端直接 import 复用同一份，
 * 从根本上杜绝三端 API 走偏。修改这里等于同时修改三端。
 */

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger'] as const
export const buttonVariants = ['solid', 'soft', 'ghost', 'text'] as const
export const buttonSizes = ['small', 'medium', 'large'] as const
export const buttonShapes = ['default', 'round', 'circle'] as const

export type ButtonType = (typeof buttonTypes)[number]
export type ButtonVariant = (typeof buttonVariants)[number]
export type ButtonSize = (typeof buttonSizes)[number]
export type ButtonShape = (typeof buttonShapes)[number]

export const buttonProps = {
  /** 语义类型 */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
    validator: (v: string) => buttonTypes.includes(v as ButtonType),
  },
  /** 填充方式 */
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'solid',
    validator: (v: string) => buttonVariants.includes(v as ButtonVariant),
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
    validator: (v: string) => buttonSizes.includes(v as ButtonSize),
  },
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'default',
    validator: (v: string) => buttonShapes.includes(v as ButtonShape),
  },
  /** 加载态：自动禁用点击并显示转圈 */
  loading: Boolean,
  disabled: Boolean,
  /** 撑满父容器宽度 */
  block: Boolean,
  /** 原生 button 的 type，表单场景需要 */
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof Object,
}

export type ButtonEmits = typeof buttonEmits
