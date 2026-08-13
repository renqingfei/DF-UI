import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { bem } from '../bem'
import type {
  AvatarProps,
  BadgeProps,
  DisplaySize,
  SkeletonItemProps,
  SpaceProps,
} from '../props/display'

/**
 * 数据展示类组件的界面无关逻辑，三端共用。
 * 都是「把 props 换算成能直接用的值」，没有 DOM 操作。
 */

/** 预设档位换算成像素；传数字就原样用 */
const SIZE_PX: Record<DisplaySize, number> = { small: 8, medium: 12, large: 18 }
const AVATAR_PX: Record<DisplaySize, number> = { small: 28, medium: 40, large: 56 }

export function toCssLength(value: string | number | undefined): string | undefined {
  if (value === undefined || value === null || value === '') return undefined
  return typeof value === 'number' ? `${value}px` : value
}

export function useSpace(props: SpaceProps) {
  const b = bem('space')

  return {
    b,
    classes: computed(() => [
      b(),
      b.m(props.direction),
      b.m(`align-${props.align}`),
      b.is('wrap', props.direction === 'horizontal' && props.wrap),
      b.is('block', props.block),
    ]),
    gap: computed(() =>
      typeof props.size === 'number' ? `${props.size}px` : `${SIZE_PX[props.size]}px`,
    ),
  }
}

export interface UseBadgeReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  /** 最终显示的文本，已处理 max 溢出 */
  content: ComputedRef<string>
  /** 是否该把徽标画出来 */
  visible: ComputedRef<boolean>
}

export function useBadge(props: BadgeProps): UseBadgeReturn {
  const b = bem('badge')

  const numeric = computed(() => (typeof props.value === 'number' ? props.value : null))

  return {
    b,
    classes: computed(() => [b(), b.m(props.type), b.is('dot', props.dot)]),
    content: computed(() => {
      if (props.dot) return ''
      if (numeric.value !== null && props.max !== undefined && numeric.value > props.max) {
        return `${props.max}+`
      }
      return props.value === undefined ? '' : String(props.value)
    }),
    visible: computed(() => {
      if (props.dot) return true
      if (props.value === undefined || props.value === '') return false
      // 数字 0 默认不显示：未读 0 条不该挂个红圈
      if (numeric.value === 0 && !props.showZero) return false
      return true
    }),
  }
}

export interface UseAvatarReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  /** 自定义像素尺寸时用的内联样式 */
  style: ComputedRef<Record<string, string> | undefined>
  /** 图片是否可用；加载失败后退回文字 */
  showImage: ComputedRef<boolean>
  failed: Ref<boolean>
  /** 文字占位内容，最多取两个字 */
  initials: ComputedRef<string>
  onError(): void
}

export function useAvatar(props: AvatarProps, emit: (event: 'error') => void): UseAvatarReturn {
  const b = bem('avatar')
  const failed = ref(false)

  const preset = computed(() => (typeof props.size === 'string' ? props.size : null))

  return {
    b,
    classes: computed(() => [
      b(),
      preset.value ? b.m(preset.value) : '',
      b.m(props.shape),
      b.is('text', !props.src || failed.value),
    ]),
    style: computed(() => {
      if (typeof props.size !== 'number') return undefined
      const px = `${props.size}px`
      // 字号跟着尺寸走，否则大头像里的文字会小得可笑
      return { width: px, height: px, fontSize: `${Math.round(props.size * 0.42)}px` }
    }),
    showImage: computed(() => Boolean(props.src) && !failed.value),
    failed,
    initials: computed(() => {
      const text = (props.text ?? '').trim()
      if (!text) return ''
      // 中文取后两字（姓名习惯），英文取首字母
      return /[a-zA-Z]/.test(text[0]) ? text.slice(0, 2).toUpperCase() : text.slice(-2)
    }),
    onError() {
      failed.value = true
      emit('error')
    },
  }
}

export function useSkeletonItem(props: SkeletonItemProps) {
  const b = bem('skeleton-item')

  return {
    b,
    classes: computed(() => [b(), b.m(props.variant)]),
    style: computed(() => {
      const style: Record<string, string> = {}
      const w = toCssLength(props.width)
      const h = toCssLength(props.height)
      if (w) style.width = w
      if (h) style.height = h
      return style
    }),
  }
}

export function avatarPresetPx(size: DisplaySize): number {
  return AVATAR_PX[size]
}
