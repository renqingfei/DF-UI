import type { ExtractPropTypes, PropType } from 'vue'
import type { SelectionValue } from './selection'

/**
 * 移动端专属组件的 API 契约（h5 与 uni 共用，PC 端不提供）。
 *
 * 这几个组件在 PC 上没有对应物：宫格、底部固定操作栏、顶部标题栏
 * 都是「一屏一件事」的移动端版式产物，硬搬到宽屏上只会显得空。
 */

export interface GridItem {
  label: string
  /** 图标文字或 emoji；等 Icon 组件做好后可传图标名 */
  icon?: string
  name?: SelectionValue
  badge?: string | number | boolean
  disabled?: boolean
}

export const gridProps = {
  items: {
    type: Array as PropType<GridItem[]>,
    default: () => [],
  },
  /** 一行几列 */
  columns: {
    type: Number,
    default: 4,
  },
  /** 每格是否正方形 */
  square: Boolean,
  /** 画出格子之间的分隔线 */
  border: Boolean,
  /** 格子之间的间距，`border` 为 true 时无效 */
  gap: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
} as const

export type GridProps = ExtractPropTypes<typeof gridProps>

export const gridEmits = {
  /** 点了某一格，回调参数是这一项与它的下标 */
  itemClick: (item: GridItem, index: number) => typeof index === 'number' && item !== undefined,
}

// —— ActionBar 底部固定操作栏 ——

export const actionBarProps = {
  fixed: {
    type: Boolean,
    default: true,
  },
  safeArea: {
    type: Boolean,
    default: true,
  },
  /** 顶部画一条分隔线 */
  border: {
    type: Boolean,
    default: true,
  },
} as const

export type ActionBarProps = ExtractPropTypes<typeof actionBarProps>

// —— NavBar 顶部标题栏 ——

export const navBarProps = {
  title: String,
  /** 显示返回箭头 */
  showBack: {
    type: Boolean,
    default: true,
  },
  backText: String,
  fixed: Boolean,
  /** 顶部补 safe-area，避开刘海与状态栏 */
  safeArea: {
    type: Boolean,
    default: true,
  },
  border: Boolean,
} as const

export type NavBarProps = ExtractPropTypes<typeof navBarProps>

export const navBarEmits = {
  back: () => true,
}

// —— List 列表 ——

export const listProps = {
  /** 项与项之间画分隔线 */
  border: {
    type: Boolean,
    default: true,
  },
  /** 整个列表包成卡片（圆角 + 投影） */
  card: {
    type: Boolean,
    default: true,
  },
} as const

export type ListProps = ExtractPropTypes<typeof listProps>

export const listItemProps = {
  /** 左侧主标题 */
  title: String,
  /** 主标题下的一行小字 */
  label: String,
  /** 右侧文字 */
  value: String,
  /** 右侧箭头，一般表示点进去还有下一页 */
  arrow: Boolean,
  clickable: Boolean,
  disabled: Boolean,
} as const

export type ListItemProps = ExtractPropTypes<typeof listItemProps>

export const listItemEmits = {
  click: () => true,
}
