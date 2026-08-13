import type { ExtractPropTypes, PropType } from 'vue'
import type { SelectionValue } from './selection'

/**
 * 导航类组件的 API 契约，三端共用。
 */

export interface TabItem {
  label: string
  /** 唯一标识，也是 v-model 的值 */
  name: SelectionValue
  disabled?: boolean
  /** 右上角徽标：数字或小圆点 */
  badge?: string | number | boolean
}

export const tabsTypes = ['line', 'card', 'segment'] as const
export type TabsType = (typeof tabsTypes)[number]

export const tabsProps = {
  /** 当前激活项的 name */
  modelValue: {
    type: [String, Number, Boolean] as PropType<SelectionValue>,
    default: undefined,
  },
  items: {
    type: Array as PropType<TabItem[]>,
    default: () => [],
  },
  /** line 下划线 / card 卡片 / segment 分段控件 */
  type: {
    type: String as PropType<TabsType>,
    default: 'line',
    validator: (v: string) => tabsTypes.includes(v as TabsType),
  },
  /** 标签超出宽度时横向滚动，否则挤在一行 */
  scrollable: {
    type: Boolean,
    default: true,
  },
  /** 每个标签等宽平分 */
  equalWidth: Boolean,
  disabled: Boolean,
} as const

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export const tabsEmits = {
  'update:modelValue': (v: SelectionValue) => v !== undefined,
  change: (v: SelectionValue) => v !== undefined,
  /** 点了任意标签，包括禁用的（禁用的不会触发 change） */
  tabClick: (item: TabItem) => item !== undefined,
}

// —— TabBar 底部导航（仅移动端） ——

export interface TabBarItem extends TabItem {
  /** 图标文字或 emoji；等 Icon 组件做好后可以传图标名 */
  icon?: string
}

export const tabBarProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<SelectionValue>,
    default: undefined,
  },
  items: {
    type: Array as PropType<TabBarItem[]>,
    default: () => [],
  },
  /** 固定在屏幕底部 */
  fixed: {
    type: Boolean,
    default: true,
  },
  /** 底部补 safe-area，避开 iPhone 手势条 */
  safeArea: {
    type: Boolean,
    default: true,
  },
} as const

export type TabBarProps = ExtractPropTypes<typeof tabBarProps>

export const tabBarEmits = {
  'update:modelValue': (v: SelectionValue) => v !== undefined,
  change: (v: SelectionValue) => v !== undefined,
}
