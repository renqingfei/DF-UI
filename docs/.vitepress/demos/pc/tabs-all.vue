<script setup lang="ts">
import { ref } from 'vue'
import type { TabItem } from '@df-ui/core'

const orderTabs: TabItem[] = [
  { label: '全部', name: 'all' },
  { label: '待付款', name: 'unpaid', badge: 3 },
  { label: '待发货', name: 'unsent', badge: true },
  { label: '已完成', name: 'done' },
  { label: '已关闭', name: 'closed', disabled: true },
]

const rangeTabs: TabItem[] = [
  { label: '今天', name: 'day' },
  { label: '本周', name: 'week' },
  { label: '本月', name: 'month' },
]

const active = ref('all')
const range = ref('week')
const card = ref('base')
</script>

<template>
  <p class="demo-note">line 下划线（默认）：横向溢出可滑动，支持徽标与禁用项</p>
  <DfTabs v-model="active" :items="orderTabs">
    <div style="padding: 4px 0">
      当前分类：<b>{{ orderTabs.find((t) => t.name === active)?.label }}</b>
      —— 内容区完全由你控制，Tabs 只负责切 name
    </div>
  </DfTabs>

  <div style="margin-top: 24px">
    <p class="demo-note">segment 分段控件：适合放在筛选栏里</p>
    <DfTabs v-model="range" :items="rangeTabs" type="segment" />
    <p class="demo-note">当前区间：{{ range }}</p>
  </div>

  <div style="margin-top: 24px">
    <p class="demo-note">card 卡片：激活项浮起来</p>
    <DfTabs
      v-model="card"
      type="card"
      :items="[
        { label: '基本信息', name: 'base' },
        { label: '收货地址', name: 'addr' },
        { label: '发票信息', name: 'invoice' },
      ]"
    />
  </div>

  <div style="margin-top: 24px">
    <p class="demo-note">equalWidth 等宽平分：移动端最常见</p>
    <DfTabs v-model="range" :items="rangeTabs" equal-width />
  </div>
</template>
