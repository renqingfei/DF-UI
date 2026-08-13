import { setScrollLockAdapter, type ScrollLockAdapter } from '@df-ui/core'

/**
 * 网页端的滚动锁定实现。
 *
 * 关键细节：锁滚动时滚动条会消失，页面可用宽度突然变大，
 * 整页内容会往右抖一下。所以要把消失掉的滚动条宽度补成 padding。
 * 这个抖动是最容易被忽略、但一眼就能看出「不精致」的地方。
 */
export const webScrollLock: ScrollLockAdapter = {
  lock() {
    if (typeof document === 'undefined') return
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
  },
  unlock() {
    if (typeof document === 'undefined') return
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  },
}

export function installWebScrollLock(): void {
  setScrollLockAdapter(webScrollLock)
}
