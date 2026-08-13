import type { ExtractPropTypes, PropType } from 'vue'

/**
 * Layout 栅格与 Table 表格的 API 契约。
 *
 * 栅格三端都有（小程序也需要分栏）；Table 只有 PC ——
 * 手机上放不下一张宽表格，硬塞只会两头不讨好，移动端用 List 代替。
 */

// —— Row / Col 栅格 ——

export const rowProps = {
  /** 列与列之间的间距 */
  gutter: {
    type: [String, Number] as PropType<string | number>,
    default: 0,
  },
  justify: {
    type: String as PropType<'start' | 'center' | 'end' | 'between' | 'around'>,
    default: 'start',
  },
  align: {
    type: String as PropType<'top' | 'middle' | 'bottom' | 'stretch'>,
    default: 'top',
  },
  wrap: {
    type: Boolean,
    default: true,
  },
} as const

export type RowProps = ExtractPropTypes<typeof rowProps>

export const colProps = {
  /** 占多少份，总共 24 份 */
  span: {
    type: Number,
    default: 24,
  },
  /** 向右偏移多少份 */
  offset: {
    type: Number,
    default: 0,
  },
  /** 窄屏（< 768px）下占多少份 */
  sm: Number,
  /** 中屏（>= 992px）下占多少份 */
  md: Number,
  /** 宽屏（>= 1200px）下占多少份 */
  lg: Number,
} as const

export type ColProps = ExtractPropTypes<typeof colProps>

// —— Table 表格（仅 PC） ——

export type TableAlign = 'left' | 'center' | 'right'

export interface TableColumn {
  /** 取数据的字段名，也是自定义单元格插槽的名字 */
  key: string
  title: string
  width?: string | number
  align?: TableAlign
  /** 固定在左侧或右侧。固定列必须给 width，否则算不出偏移 */
  fixed?: 'left' | 'right'
  /** 点表头可排序 */
  sortable?: boolean
}

export type SortOrder = 'asc' | 'desc' | null

export const tableProps = {
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<Array<Record<string, unknown>>>,
    default: () => [],
  },
  /** 行的唯一标识字段，不给就用下标（不稳定，数据会变时务必给） */
  rowKey: String,
  /** 斑马纹 */
  stripe: Boolean,
  /** 画竖线 */
  border: Boolean,
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  /** 超过这个高度就固定表头、内容区滚动 */
  maxHeight: [String, Number] as PropType<string | number>,
  loading: Boolean,
  emptyText: {
    type: String,
    default: '暂无数据',
  },
  /** 当前排序字段与方向；不传则由组件自己维护 */
  sortKey: String,
  sortOrder: {
    type: String as PropType<SortOrder>,
    default: null,
  },
  /** 是否在组件内部对数据排序。接后端分页排序时关掉，只听 sortChange 事件 */
  localSort: {
    type: Boolean,
    default: true,
  },
} as const

export type TableProps = ExtractPropTypes<typeof tableProps>

export const tableEmits = {
  rowClick: (row: Record<string, unknown>, index: number) =>
    typeof index === 'number' && row !== undefined,
  sortChange: (key: string, order: SortOrder) => typeof key === 'string' && order !== undefined,
}

// —— Pagination 翻页器（仅 PC） ——

export const paginationProps = {
  /** 当前页，从 1 开始 */
  modelValue: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  /** 中间最多显示几个页码按钮，两端的省略号不算 */
  pagerCount: {
    type: Number,
    default: 7,
  },
  /** 显示「共 N 条」 */
  showTotal: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
} as const

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const paginationEmits = {
  'update:modelValue': (v: number) => typeof v === 'number',
  change: (v: number) => typeof v === 'number',
}
