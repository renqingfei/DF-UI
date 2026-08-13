<script lang="ts">
export default { name: 'DfTable' }
</script>

<script setup lang="ts">
/**
 * 表格。只有 PC 端 —— 手机上放不下一张宽表格，移动端用 List 代替。
 *
 * 固定表头与固定列全部用 CSS sticky，**不测量任何元素**：
 * 表头 sticky top、固定列 sticky left / right。
 * 代价是固定列必须显式给 width（第二个固定列的偏移是前面列宽之和，只能由配置算）。
 */
import { tableEmits, tableProps, useTable } from '@df-ui/core'
import DfEmpty from '../../empty/src/empty.vue'
import DfLoading from '../../loading/src/loading.vue'

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const {
  b,
  classes,
  rows,
  wrapperStyle,
  columnStyle,
  columnClasses,
  sortIndicator,
  toggleSort,
  rowKeyOf,
} = useTable(props, emit)
</script>

<template>
  <div :class="classes">
    <div :class="b('wrapper')" :style="wrapperStyle">
      <table :class="b('inner')">
        <colgroup>
          <col
            v-for="(column, i) in columns"
            :key="`col-${column.key}`"
            :style="columnStyle(column, i)"
          />
        </colgroup>

        <thead v-if="showHeader">
          <tr>
            <th
              v-for="(column, i) in columns"
              :key="column.key"
              :class="columnClasses(column)"
              :style="columnStyle(column, i)"
              :aria-sort="
                sortIndicator(column) === 'none'
                  ? undefined
                  : sortIndicator(column) === 'asc'
                    ? 'ascending'
                    : 'descending'
              "
              @click="toggleSort(column)"
            >
              <span :class="b('th-inner')">
                <slot :name="`header-${column.key}`" :column="column">{{ column.title }}</slot>
                <span
                  v-if="column.sortable"
                  :class="[b('sorter'), `is-${sortIndicator(column)}`]"
                  aria-hidden="true"
                >
                  <i :class="b('sorter-up')" />
                  <i :class="b('sorter-down')" />
                </span>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in rows"
            :key="rowKeyOf(row, index)"
            :class="b('row')"
            @click="emit('rowClick', row, index)"
          >
            <td
              v-for="(column, i) in columns"
              :key="column.key"
              :class="columnClasses(column)"
              :style="columnStyle(column, i)"
            >
              <slot :name="column.key" :row="row" :index="index" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!loading && rows.length === 0" :class="b('empty')">
        <slot name="empty">
          <DfEmpty :description="emptyText" size="small" />
        </slot>
      </div>
    </div>

    <DfLoading v-if="loading" overlay text="加载中" />
  </div>
</template>
