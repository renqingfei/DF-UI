<script lang="ts">
export default { name: 'DfActionBar' }
</script>

<script setup lang="ts">
/**
 * 底部固定操作栏：详情页那条「加入购物车 / 立即购买」。
 *
 * 移动端主操作放这里，不放页面中间 —— 拇指在屏幕下沿最容易点到。
 * 记得给页面留出同高度的底部内边距，否则最后一屏内容会被压住。
 */
import { computed } from 'vue'
import { actionBarProps, bem } from '@df-ui/core'

const props = defineProps(actionBarProps)

const b = bem('action-bar')

const classes = computed(() => [
  b(),
  b.is('fixed', props.fixed),
  b.is('safe-area', props.safeArea),
  b.is('border', props.border),
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
