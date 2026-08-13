import { ref, type Ref } from 'vue'

/**
 * 浮层基建：层级栈与滚动锁定。
 *
 * 所有会盖在页面上的东西（Dialog / Popup / Toast / Loading / 下拉面板）都从这里领 z-index，
 * 而不是各自写死一个数。写死的后果是「弹窗里再开一个弹窗」时层级打架 ——
 * 这是组件库最常见的顽固 bug。
 *
 * 这里不碰 DOM：滚动锁定的实际动作由各端注入适配器完成
 * （网页改 body 样式，小程序靠页面配置或 catchtouchmove）。
 */

/** 起始层级。留出 2000 以下给业务自己的定位元素 */
const BASE_Z_INDEX = 2000

const currentZIndex = ref(BASE_Z_INDEX)

/** 领一个新的层级号，后开的永远盖在先开的上面 */
export function nextZIndex(): number {
  currentZIndex.value += 2
  return currentZIndex.value
}

export function getZIndex(): number {
  return currentZIndex.value
}

/** 测试用：把层级计数拨回起点 */
export function resetZIndex(): void {
  currentZIndex.value = BASE_Z_INDEX
}

export interface ScrollLockAdapter {
  lock(): void
  unlock(): void
}

const noopLock: ScrollLockAdapter = { lock: () => {}, unlock: () => {} }

let lockAdapter: ScrollLockAdapter = noopLock

export function setScrollLockAdapter(adapter: ScrollLockAdapter): void {
  lockAdapter = adapter
}

/**
 * 当前有多少个浮层要求锁滚动。
 *
 * 必须计数而不是布尔：两个弹窗叠着开，关掉上面那个时不能把滚动解开，
 * 否则下面那个弹窗还开着、背景却能滚了。
 */
const lockCount = ref(0)

export function lockScroll(): void {
  lockCount.value++
  if (lockCount.value === 1) lockAdapter.lock()
}

export function unlockScroll(): void {
  if (lockCount.value === 0) return
  lockCount.value--
  if (lockCount.value === 0) lockAdapter.unlock()
}

export const scrollLockCount: Ref<number> = lockCount
