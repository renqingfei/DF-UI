import type { ExtractPropTypes, PropType } from 'vue'

/**
 * 反馈类组件的 API 契约，三端共用。
 */

// —— Popup 弹出层 ——

export const popupPositions = ['center', 'bottom', 'top', 'left', 'right'] as const
export type PopupPosition = (typeof popupPositions)[number]

export const popupProps = {
  /** 是否显示，用 v-model:visible 控制 */
  visible: Boolean,
  /** 从哪个方向出来。移动端最常用 bottom */
  position: {
    type: String as PropType<PopupPosition>,
    default: 'center',
    validator: (v: string) => popupPositions.includes(v as PopupPosition),
  },
  /** 显示半透明遮罩 */
  overlay: {
    type: Boolean,
    default: true,
  },
  /** 点遮罩关闭 */
  closeOnOverlay: {
    type: Boolean,
    default: true,
  },
  /** 按 Esc 关闭（仅 Web 端有键盘） */
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  /** 右上角关闭叉 */
  closable: Boolean,
  /** 打开时锁住背景滚动 */
  lockScroll: {
    type: Boolean,
    default: true,
  },
  /** 圆角，不传则按方向自动决定（底部弹出只圆上面两个角） */
  round: {
    type: Boolean,
    default: true,
  },
  /** 宽 / 高，按方向生效 */
  width: [String, Number] as PropType<string | number>,
  height: [String, Number] as PropType<string | number>,
  /** 关闭后销毁内部内容，适合内容重的弹层 */
  destroyOnClose: Boolean,
} as const

export type PopupProps = ExtractPropTypes<typeof popupProps>

export const popupEmits = {
  'update:visible': (v: boolean) => typeof v === 'boolean',
  open: () => true,
  close: () => true,
  /** 点遮罩时触发，无论是否真的关闭 */
  overlayClick: () => true,
}

// —— Dialog 对话框 ——

export const dialogProps = {
  visible: Boolean,
  title: String,
  /** 正文，也可用默认插槽 */
  content: String,
  /** 确认按钮文字 */
  confirmText: {
    type: String,
    default: '确定',
  },
  /** 取消按钮文字 */
  cancelText: {
    type: String,
    default: '取消',
  },
  /** 是否显示取消按钮。只提示不需要选择时关掉 */
  showCancel: {
    type: Boolean,
    default: true,
  },
  /** 确认按钮的语义色，删除类操作用 danger */
  confirmType: {
    type: String as PropType<'primary' | 'danger'>,
    default: 'primary',
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  closeOnOverlay: Boolean,
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  width: [String, Number] as PropType<string | number>,
  /**
   * 确认前的钩子。返回 false 或 reject 就不关闭。
   * 典型用法：点确定先提交请求，成功才关窗，期间按钮转圈。
   */
  beforeConfirm: Function as PropType<() => boolean | Promise<boolean>>,
} as const

export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmits = {
  'update:visible': (v: boolean) => typeof v === 'boolean',
  confirm: () => true,
  cancel: () => true,
  open: () => true,
  close: () => true,
}

// —— Toast 轻提示 ——

export const toastTypes = ['text', 'success', 'error', 'warning', 'loading'] as const
export type ToastType = (typeof toastTypes)[number]

export const toastPositions = ['center', 'top', 'bottom'] as const
export type ToastPosition = (typeof toastPositions)[number]

export interface ToastOptions {
  message: string
  type?: ToastType
  /** 毫秒。传 0 表示不自动消失，需要手动关 */
  duration?: number
  position?: ToastPosition
  /** 显示期间是否禁止点击穿透 */
  forbidClick?: boolean
}

export const toastProps = {
  visible: Boolean,
  message: String,
  type: {
    type: String as PropType<ToastType>,
    default: 'text',
    validator: (v: string) => toastTypes.includes(v as ToastType),
  },
  duration: {
    type: Number,
    default: 2000,
  },
  position: {
    type: String as PropType<ToastPosition>,
    default: 'center',
    validator: (v: string) => toastPositions.includes(v as ToastPosition),
  },
  forbidClick: Boolean,
} as const

export type ToastProps = ExtractPropTypes<typeof toastProps>

export const toastEmits = {
  'update:visible': (v: boolean) => typeof v === 'boolean',
  close: () => true,
}

// —— Loading 加载 ——

export const loadingProps = {
  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: true,
  },
  /** 转圈下方的文字 */
  text: String,
  size: {
    type: [String, Number] as PropType<'small' | 'medium' | 'large' | number>,
    default: 'medium',
  },
  /** 盖住父容器：父容器要有非 static 定位 */
  overlay: Boolean,
  /** 盖满整屏 */
  fullscreen: Boolean,
} as const

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
