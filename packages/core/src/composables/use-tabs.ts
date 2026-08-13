import { computed, type ComputedRef } from 'vue'
import { bem } from '../bem'
import type { TabBarItem, TabBarProps, TabItem, TabsProps } from '../props/navigation'
import type { SelectionValue } from '../props/selection'

/**
 * Tabs / TabBar 的界面无关逻辑，三端共用。
 *
 * 关于下划线指示器的一个刻意取舍：**指示器画在激活项内部，不做跨标签滑动**。
 *
 * 要让指示器从上一个标签「滑」到下一个，必须知道每个标签的宽度和位置 ——
 * 网页端能同步量，小程序端只能走异步接口，还得处理字体加载完成后的重排。
 * 为了一个过渡动画引入一整套测量机制，收益远低于成本。
 * 指示器放在激活项里，宽度天然正确，三端表现完全一致。
 */

export interface UseTabsReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  activeName: ComputedRef<SelectionValue | undefined>
  isActive(item: TabItem): boolean
  isDisabled(item: TabItem): boolean
  itemClasses(item: TabItem): string[]
  select(item: TabItem): void
}

export interface TabsEmit {
  (event: 'update:modelValue', v: SelectionValue): void
  (event: 'change', v: SelectionValue): void
  (event: 'tabClick', item: TabItem): void
}

export function useTabs(props: TabsProps, emit: TabsEmit): UseTabsReturn {
  const b = bem('tabs')

  // 没给 modelValue 时默认落在第一个可用项上，否则一个标签都不高亮，看着像坏了
  const activeName = computed(() => {
    if (props.modelValue !== undefined) return props.modelValue
    return props.items.find((i) => !i.disabled)?.name
  })

  function isActive(item: TabItem) {
    return activeName.value === item.name
  }

  function isDisabled(item: TabItem) {
    return Boolean(item.disabled || props.disabled)
  }

  return {
    b,
    classes: computed(() => [
      b(),
      b.m(props.type),
      b.is('scrollable', props.scrollable && !props.equalWidth),
      b.is('equal', props.equalWidth),
      b.is('disabled', props.disabled),
    ]),
    activeName,
    isActive,
    isDisabled,
    itemClasses(item) {
      return [
        b('item'),
        isActive(item) ? 'is-active' : '',
        isDisabled(item) ? 'is-disabled' : '',
      ].filter(Boolean)
    },
    select(item) {
      emit('tabClick', item)
      if (isDisabled(item) || isActive(item)) return
      emit('update:modelValue', item.name)
      emit('change', item.name)
    },
  }
}

export interface UseTabBarReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  activeName: ComputedRef<SelectionValue | undefined>
  isActive(item: TabBarItem): boolean
  itemClasses(item: TabBarItem): string[]
  select(item: TabBarItem): void
}

export interface TabBarEmit {
  (event: 'update:modelValue', v: SelectionValue): void
  (event: 'change', v: SelectionValue): void
}

export function useTabBar(props: TabBarProps, emit: TabBarEmit): UseTabBarReturn {
  const b = bem('tabbar')

  const activeName = computed(() => {
    if (props.modelValue !== undefined) return props.modelValue
    return props.items.find((i) => !i.disabled)?.name
  })

  function isActive(item: TabBarItem) {
    return activeName.value === item.name
  }

  return {
    b,
    classes: computed(() => [
      b(),
      b.is('fixed', props.fixed),
      b.is('safe-area', props.safeArea),
    ]),
    activeName,
    isActive,
    itemClasses(item) {
      return [b('item'), isActive(item) ? 'is-active' : '', item.disabled ? 'is-disabled' : ''].filter(
        Boolean,
      )
    },
    select(item) {
      if (item.disabled || isActive(item)) return
      emit('update:modelValue', item.name)
      emit('change', item.name)
    },
  }
}

/** 徽标内容：true 表示只显示小圆点 */
export function badgeContent(badge: string | number | boolean | undefined) {
  if (badge === undefined || badge === false) return null
  return badge === true ? '' : String(badge)
}
