import type { ToastOptions, ToastType } from '@df-ui/core'

/**
 * 小程序端的 Toast：直接转发给 uni 原生 API。
 *
 * 为什么不像 Web 端那样自己画一个：
 * 1. Web 端的做法是「运行时 createApp 挂一个实例到 body」——小程序没有 body、
 *    也不允许运行时往页面里插节点
 * 2. `uni.showToast` 是小程序用户最熟的形态，而且**能盖在原生组件之上** ——
 *    自己用 view 画的浮层会被 video / map / camera 压住
 * 3. 代价是外观不受主题控制。这是刻意的取舍：轻提示只闪一下，
 *    换取「一定能显示出来」比换取「配色统一」值得
 *
 * 需要完全受控的外观时，用 <df-popup position="top"> 自己拼一个。
 */

type UniApi = {
  showToast(options: {
    title: string
    icon?: 'success' | 'error' | 'loading' | 'none'
    duration?: number
    mask?: boolean
  }): void
  hideToast(): void
  showLoading(options: { title?: string; mask?: boolean }): void
  hideLoading(): void
}

declare const uni: UniApi | undefined

function api(): UniApi | null {
  return typeof uni === 'undefined' ? null : uni
}

/** DF 的 type → uni 的 icon */
const ICON_MAP: Record<ToastType, 'success' | 'error' | 'loading' | 'none'> = {
  text: 'none',
  success: 'success',
  error: 'error',
  warning: 'none',
  loading: 'loading',
}

function show(options: ToastOptions | string) {
  const u = api()
  if (!u) return

  const next = typeof options === 'string' ? { message: options } : options
  const type = next.type ?? 'text'

  if (type === 'loading') {
    u.showLoading({ title: next.message, mask: next.forbidClick ?? true })
    return
  }

  u.showToast({
    title: next.message,
    icon: ICON_MAP[type],
    duration: next.duration ?? 2000,
    mask: next.forbidClick ?? false,
  })
}

function close() {
  const u = api()
  if (!u) return
  u.hideToast()
  u.hideLoading()
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
  /** 小程序端的 loading 走 uni.showLoading，不会自动消失，记得调 close() */
  loading: make('loading'),
}
