import { computed, onBeforeUnmount, ref, watch, type ComputedRef, type Ref } from 'vue'
import { bem } from '../bem'
import { lockScroll, nextZIndex, unlockScroll } from '../overlay'
import { toCssLength } from './use-display'
import type { PopupProps } from '../props/feedback'

/**
 * 浮层的共用逻辑，三端共用：领层级、锁滚动、按方向算样式、销毁内容。
 *
 * 一个刻意的取舍：这里不做「进出场动画」的时序控制。
 * Web 端用 <Transition> 就够了，小程序没有 Transition，
 * 靠 class 切换 + CSS 过渡实现，两边差别太大，交给各端模板。
 */

export interface UseOverlayReturn {
  b: ReturnType<typeof bem>
  /** 当前是否需要渲染（destroyOnClose 时关闭后为 false） */
  rendered: Ref<boolean>
  zIndex: Ref<number>
  classes: ComputedRef<string[]>
  /** 面板尺寸样式，按方向决定用宽还是高 */
  panelStyle: ComputedRef<Record<string, string>>
  /** 圆角样式类 —— 底部弹出只圆上面两个角 */
  close(): void
  onOverlayClick(): void
}

export function useOverlay(
  props: PopupProps,
  emit: {
    (event: 'update:visible', v: boolean): void
    (event: 'open'): void
    (event: 'close'): void
    (event: 'overlayClick'): void
  },
  options: { block?: string } = {},
): UseOverlayReturn {
  const b = bem(options.block ?? 'popup')
  const zIndex = ref(nextZIndex())
  const rendered = ref(props.visible)

  let locked = false

  function applyLock(on: boolean) {
    if (!props.lockScroll) return
    if (on && !locked) {
      lockScroll()
      locked = true
    } else if (!on && locked) {
      unlockScroll()
      locked = false
    }
  }

  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        // 每次打开都重新领一个层级：后开的必须盖在先开的上面
        zIndex.value = nextZIndex()
        rendered.value = true
        applyLock(true)
        emit('open')
      } else {
        applyLock(false)
        emit('close')
        if (props.destroyOnClose) {
          // 等动画放完再销毁，否则会「啪」地消失
          setTimeout(() => {
            if (!props.visible) rendered.value = false
          }, 300)
        }
      }
    },
    { immediate: true },
  )

  // 组件被卸载时如果还开着，必须把滚动解开，否则整页永久锁死
  onBeforeUnmount(() => applyLock(false))

  function close() {
    emit('update:visible', false)
  }

  return {
    b,
    rendered,
    zIndex,
    classes: computed(() => [
      b(),
      b.m(props.position),
      b.is('round', props.round),
      b.is('open', props.visible),
    ]),
    panelStyle: computed(() => {
      const style: Record<string, string> = {}
      const width = toCssLength(props.width)
      const height = toCssLength(props.height)
      const horizontal = props.position === 'left' || props.position === 'right'
      const vertical = props.position === 'top' || props.position === 'bottom'

      if (width && (horizontal || props.position === 'center')) style.width = width
      if (height && (vertical || props.position === 'center')) style.height = height
      // 侧边抽屉不给宽度就用一个能放下表单的默认值
      if (horizontal && !width) style.width = '320px'
      return style
    }),
    close,
    onOverlayClick() {
      emit('overlayClick')
      if (props.closeOnOverlay) close()
    },
  }
}

export interface UseAsyncConfirmReturn {
  /** 确认按钮是否在转圈 */
  pending: Ref<boolean>
  /** 跑一次确认流程，返回是否应该关闭 */
  run(): Promise<boolean>
}

/**
 * 「点确定先请求，成功才关窗」的通用流程。
 * Dialog 与 Switch 的 beforeChange 是同一个套路，但 Dialog 还要管按钮转圈。
 */
export function useAsyncConfirm(
  hook: (() => boolean | Promise<boolean>) | undefined,
): UseAsyncConfirmReturn {
  const pending = ref(false)

  return {
    pending,
    async run() {
      if (!hook) return true
      pending.value = true
      try {
        return (await hook()) !== false
      } catch {
        // 钩子抛异常等同于「别关」——请求失败时窗不该关
        return false
      } finally {
        pending.value = false
      }
    },
  }
}
