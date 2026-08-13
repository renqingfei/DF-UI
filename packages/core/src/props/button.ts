import type { ExtractPropTypes, PropType } from 'vue'

/**
 * Button 的 API 契约（props / emits / 取值枚举）。
 *
 * 这里是三端唯一的真相源：pc / h5 / uni 三个包都 import 这一份，
 * 谁也不许自己再声明一遍 props。改这里等于同时改三端，
 * 三端 API 走偏在物理上就不可能发生。
 *
 * 契约里只允许出现与界面无关的东西 —— 不许 import 任何 DOM API，
 * 因为小程序端没有 DOM。
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
  /** 原生 button 的 type，表单场景需要。小程序端 form-type 同源于此 */
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

/**
 * click 载荷在 Web 端是真实 MouseEvent；小程序端 uni 给的是 tap 事件对象，
 * 由 @df-ui/uni 在抛出前做一次收窄断言，好处是 pc / h5 使用方能拿到完整的
 * MouseEvent 类型提示，而不是被小程序拖成一个宽泛的联合类型。
 */
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof Object,
}

export type ButtonEmits = typeof buttonEmits
