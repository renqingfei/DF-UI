<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TableColumn } from '@df-ui/core'
import { DfToast } from '@df-ui/pc'

const columns: TableColumn[] = [
  { key: 'name', title: '姓名', width: 110, fixed: 'left' },
  { key: 'dept', title: '部门', width: 110 },
  { key: 'city', title: '城市', width: 110 },
  { key: 'level', title: '职级', width: 100 },
  { key: 'score', title: '绩效分', width: 110, align: 'right', sortable: true },
  { key: 'joined', title: '入职时间', width: 140, sortable: true },
  { key: 'status', title: '状态', width: 110 },
  { key: 'action', title: '操作', width: 90, fixed: 'right', align: 'center' },
]

const all = [
  { id: 1, name: '张三', dept: '前端', city: '上海', level: 'P6', score: 88, joined: '2021-03-02', status: 'on' },
  { id: 2, name: '李四', dept: '后端', city: '北京', level: 'P7', score: 95, joined: '2019-07-18', status: 'on' },
  { id: 3, name: '王五', dept: '设计', city: '广州', level: 'P5', score: 72, joined: '2022-11-05', status: 'leave' },
  { id: 4, name: '赵六', dept: '测试', city: '深圳', level: 'P6', score: 81, joined: '2020-01-20', status: 'on' },
  { id: 5, name: '钱七', dept: '产品', city: '杭州', level: 'P7', score: 90, joined: '2018-05-11', status: 'off' },
  { id: 6, name: '孙八', dept: '前端', city: '成都', level: 'P5', score: 66, joined: '2023-02-14', status: 'on' },
  { id: 7, name: '周九', dept: '后端', city: '武汉', level: 'P8', score: 98, joined: '2017-09-30', status: 'on' },
]

const page = ref(1)
const pageSize = 5
const loading = ref(false)

const rows = computed(() => all.slice((page.value - 1) * pageSize, page.value * pageSize))

const statusMap: Record<string, { text: string; type: 'success' | 'warning' | 'default' }> = {
  on: { text: '在职', type: 'success' },
  leave: { text: '休假中', type: 'warning' },
  off: { text: '已离职', type: 'default' },
}

/** 模拟一次翻页请求 */
function onPageChange() {
  loading.value = true
  setTimeout(() => (loading.value = false), 500)
}
</script>

<template>
  <p class="demo-note">
    横向拖一下：<b>姓名列固定在左、操作列固定在右</b>。点「绩效分」「入职时间」表头可排序（升 → 降 → 不排序）
  </p>

  <DfTable
    :columns="columns"
    :data="rows"
    :loading="loading"
    row-key="id"
    stripe
    border
    @row-click="(row) => DfToast.text(`点了 ${row.name}`)"
  >
    <template #score="{ value }">
      <b :style="{ color: Number(value) >= 90 ? 'var(--df-color-ok)' : undefined }">{{ value }}</b>
    </template>

    <template #status="{ value }">
      <DfTag :type="statusMap[String(value)].type" size="small">
        {{ statusMap[String(value)].text }}
      </DfTag>
    </template>

    <template #action>
      <DfButton size="small" variant="text" type="primary">编辑</DfButton>
    </template>
  </DfTable>

  <div style="display: flex; justify-content: flex-end; margin-top: 14px">
    <DfPagination
      v-model="page"
      :total="all.length"
      :page-size="pageSize"
      @change="onPageChange"
    />
  </div>

  <DfDivider>固定表头（拖动表格内部纵向滚动）</DfDivider>

  <DfTable :columns="columns" :data="all" row-key="id" :max-height="220" />
</template>
