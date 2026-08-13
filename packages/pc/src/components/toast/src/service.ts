import { createApp, h, ref, type App, type Ref } from 'vue'
import type { ToastOptions, ToastType } from '@df-ui/core'
import ToastComponent from './toast.vue'

/**
 * Toast 的函数式调用：`Toast.success('保存成功')`。
 *
 * 为什么不做成「每调一次挂一个组件」：轻提示同一时刻只该有一条，
 * 后一条自然顶掉前一条。所以这里全局只挂一个实例，反复复用它。
 */

interface ToastState {
  visible: boolean
  message: string
  type: ToastType
  duration: number
  position: 'center' | 'top' | 'bottom'
  forbidClick: boolean
}

let app: App | null = null
let state: Ref<ToastState> | null = null

function ensureMounted(): Ref<ToastState> | null {
  if (typeof document === 'undefined') return null
  if (state) return state

  state = ref<ToastState>({
    visible: false,
    message: '',
    type: 'text',
    duration: 2000,
    position: 'center',
    forbidClick: false,
  })

  const host = document.createElement('div')
  host.className = 'df-toast-host'
  document.body.appendChild(host)

  app = createApp({
    setup() {
      return () =>
        h(ToastComponent, {
          ...state!.value,
          'onUpdate:visible': (v: boolean) => {
            state!.value = { ...state!.value, visible: v }
          },
        })
    },
  })
  app.mount(host)

  return state
}

function show(options: ToastOptions | string) {
  const s = ensureMounted()
  if (!s) return

  const next = typeof options === 'string' ? { message: options } : options
  s.value = {
    visible: true,
    message: next.message,
    type: next.type ?? 'text',
    duration: next.duration ?? (next.type === 'loading' ? 0 : 2000),
    position: next.position ?? 'center',
    forbidClick: next.forbidClick ?? next.type === 'loading',
  }
}

function close() {
  if (state) state.value = { ...state.value, visible: false }
}

function make(type: ToastType) {
  return (message: string, duration?: number) => show({ message, type, duration })
}

export const DfToast = {
  show,
  close,
  text: make('text'),
  success: make('success'),
  error: make('error'),
  warning: make('warning'),
  /** 加载中默认不自动消失，记得自己调 close() */
  loading: make('loading'),
}

/** 测试用：卸载全局实例 */
export function destroyToast() {
  app?.unmount()
  app = null
  state = null
  document.querySelectorAll('.df-toast-host').forEach((el) => el.remove())
}
