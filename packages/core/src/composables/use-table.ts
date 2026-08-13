import { computed, ref, type ComputedRef } from 'vue'
import { bem } from '../bem'
import { toCssLength } from './use-display'
import type {
  PaginationProps,
  SortOrder,
  TableColumn,
  TableProps,
} from '../props/layout'

/**
 * Table 与 Pagination 的界面无关逻辑。
 *
 * Table 的固定表头与固定列全部用 CSS sticky 实现，**不测量任何元素**：
 * 表头 sticky top、固定列 sticky left/right。代价是固定列必须显式给 width ——
 * 因为第二个固定列的左偏移是前面几列宽度之和，这个和只能由配置算，不能靠测量。
 */

export interface UseTableReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  /** 排序后的数据；localSort 关掉时原样返回 */
  rows: ComputedRef<Array<Record<string, unknown>>>
  currentSort: ComputedRef<{ key: string; order: SortOrder }>
  wrapperStyle: ComputedRef<Record<string, string> | undefined>
  columnStyle(column: TableColumn, index: number): Record<string, string>
  columnClasses(column: TableColumn): string[]
  sortIndicator(column: TableColumn): 'asc' | 'desc' | 'none'
  toggleSort(column: TableColumn): void
  rowKeyOf(row: Record<string, unknown>, index: number): string
}

export interface TableEmit {
  (event: 'rowClick', row: Record<string, unknown>, index: number): void
  (event: 'sortChange', key: string, order: SortOrder): void
}

export function useTable(props: TableProps, emit: TableEmit): UseTableReturn {
  const b = bem('table')

  // 受控与非受控两种用法：外面传了 sortKey 就听外面的，没传就自己记
  const innerKey = ref('')
  const innerOrder = ref<SortOrder>(null)

  const currentSort = computed(() => ({
    key: props.sortKey ?? innerKey.value,
    order: props.sortKey !== undefined ? props.sortOrder : innerOrder.value,
  }))

  /** 固定列的偏移量：前面所有同侧固定列的宽度之和 */
  function fixedOffset(column: TableColumn, index: number): number {
    if (!column.fixed) return 0
    const side = column.fixed
    const list = props.columns
    let offset = 0

    if (side === 'left') {
      for (let i = 0; i < index; i++) {
        if (list[i]?.fixed === 'left') offset += Number.parseFloat(String(list[i].width ?? 0)) || 0
      }
    } else {
      for (let i = list.length - 1; i > index; i--) {
        if (list[i]?.fixed === 'right') offset += Number.parseFloat(String(list[i].width ?? 0)) || 0
      }
    }
    return offset
  }

  return {
    b,
    classes: computed(() => [
      b(),
      b.m(props.size),
      b.is('stripe', props.stripe),
      b.is('border', props.border),
      b.is('sticky-header', props.maxHeight !== undefined),
    ]),
    rows: computed(() => {
      const { key, order } = currentSort.value
      if (!props.localSort || !key || !order) return props.data

      // 拷一份再排，不改调用方传进来的数组
      return [...props.data].sort((a, b2) => {
        const va = a[key]
        const vb = b2[key]
        if (va === vb) return 0
        if (va === null || va === undefined) return 1
        if (vb === null || vb === undefined) return -1
        const result =
          typeof va === 'number' && typeof vb === 'number'
            ? va - vb
            : String(va).localeCompare(String(vb), 'zh-CN')
        return order === 'asc' ? result : -result
      })
    }),
    currentSort,
    wrapperStyle: computed(() => {
      const max = toCssLength(props.maxHeight)
      return max ? { maxHeight: max } : undefined
    }),
    columnStyle(column, index) {
      const style: Record<string, string> = {}
      const width = toCssLength(column.width)
      if (width) {
        style.width = width
        style.minWidth = width
      }
      if (column.align) style.textAlign = column.align
      if (column.fixed) {
        const offset = fixedOffset(column, index)
        style[column.fixed] = `${offset}px`
      }
      return style
    },
    columnClasses(column) {
      return [
        column.fixed ? b('cell', `fixed-${column.fixed}`) : '',
        column.sortable ? 'is-sortable' : '',
      ].filter(Boolean)
    },
    sortIndicator(column) {
      const { key, order } = currentSort.value
      if (key !== column.key || !order) return 'none'
      return order
    },
    toggleSort(column) {
      if (!column.sortable) return
      const { key, order } = currentSort.value
      // 升 → 降 → 不排序，三态循环
      const nextOrder: SortOrder =
        key !== column.key ? 'asc' : order === 'asc' ? 'desc' : order === 'desc' ? null : 'asc'

      innerKey.value = nextOrder ? column.key : ''
      innerOrder.value = nextOrder
      emit('sortChange', column.key, nextOrder)
    },
    rowKeyOf(row, index) {
      const key = props.rowKey ? row[props.rowKey] : undefined
      return key === undefined || key === null ? String(index) : String(key)
    },
  }
}

export interface UsePaginationReturn {
  b: ReturnType<typeof bem>
  classes: ComputedRef<string[]>
  pageCount: ComputedRef<number>
  /** 要显示的页码，-1 表示省略号 */
  pages: ComputedRef<number[]>
  canPrev: ComputedRef<boolean>
  canNext: ComputedRef<boolean>
  go(page: number): void
  prev(): void
  next(): void
}

export interface PaginationEmit {
  (event: 'update:modelValue', v: number): void
  (event: 'change', v: number): void
}

export function usePagination(
  props: PaginationProps,
  emit: PaginationEmit,
): UsePaginationReturn {
  const b = bem('pagination')

  const pageCount = computed(() => Math.max(1, Math.ceil(props.total / Math.max(1, props.pageSize))))

  // 写成独立函数而不是对象方法：调用方一定会解构使用，方法里用 this 会拿不到对象
  function go(page: number) {
    if (props.disabled) return
    const next = Math.min(Math.max(1, page), pageCount.value)
    if (next === props.modelValue) return
    emit('update:modelValue', next)
    emit('change', next)
  }

  return {
    b,
    classes: computed(() => [b(), b.is('disabled', props.disabled)]),
    pageCount,
    /**
     * 页码列表。超过 pagerCount 时首尾常驻、中间跟着当前页滑动，
     * 断开处放 -1 表示省略号 —— 这是翻页器唯一有点绕的地方。
     */
    pages: computed(() => {
      const total = pageCount.value
      const max = Math.max(5, props.pagerCount)
      if (total <= max) return Array.from({ length: total }, (_, i) => i + 1)

      const current = Math.min(Math.max(1, props.modelValue), total)
      // 首页、尾页、两个省略号占掉 4 个位置
      const side = Math.floor((max - 4) / 2)
      let start = Math.max(2, current - side)
      let end = Math.min(total - 1, current + side)

      if (current - side < 2) end = Math.min(total - 1, end + (2 - (current - side)))
      if (current + side > total - 1) start = Math.max(2, start - (current + side - (total - 1)))

      const middle: number[] = []
      for (let i = start; i <= end; i++) middle.push(i)

      return [
        1,
        ...(start > 2 ? [-1] : []),
        ...middle,
        ...(end < total - 1 ? [-1] : []),
        total,
      ]
    }),
    canPrev: computed(() => !props.disabled && props.modelValue > 1),
    canNext: computed(() => !props.disabled && props.modelValue < pageCount.value),
    go,
    prev: () => go(props.modelValue - 1),
    next: () => go(props.modelValue + 1),
  }
}
