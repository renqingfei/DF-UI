import { computed, type ComputedRef } from 'vue'
import { bem } from '../bem'
import type { ButtonProps } from '../props/button'

export interface UseButtonReturn {
  /** BEM 生成器，供模板拼子元素类名 */
  b: ReturnType<typeof bem>
  /** 根节点类名 */
  classes: ComputedRef<string[]>
  /** loading 也算禁用：加载中重复点击是最常见的重复提交来源 */
  isDisabled: ComputedRef<boolean>
}

/**
 * Button 的界面无关逻辑：类名推导与禁用判定。
 *
 * pc / h5 / uni 三端的模板各写各的，但都调这一个函数，
 * 于是三端输出的类名结构天然一致，样式表也就能按同一套 BEM 命名去写。
 *
 * 这里不碰任何 DOM —— 事件对象的 preventDefault / stopPropagation
 * 由各端模板自己处理，因为小程序的事件对象没有这些方法。
 */
export function useButton(props: ButtonProps): UseButtonReturn {
  const b = bem('button')

  const isDisabled = computed(() => Boolean(props.disabled || props.loading))

  const classes = computed(() => [
    b(),
    b.m(props.type),
    b.m(props.variant),
    b.m(props.size),
    props.shape !== 'default' ? b.m(props.shape) : '',
    b.is('block', props.block),
    b.is('loading', props.loading),
    b.is('disabled', isDisabled.value),
  ])

  return { b, classes, isDisabled }
}
