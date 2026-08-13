<script lang="ts">
export default { name: 'DfActionBar' }
</script>

<script setup lang="ts">
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
  <view :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
.df-action-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px var(--df-m-page-padding, 18px);
  background-color: var(--df-color-surface, #ffffff);
  box-sizing: border-box;
}

.df-action-bar.is-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
}

/* 避开 iPhone 底部手势条 */
.df-action-bar.is-safe-area {
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
}

.df-action-bar.is-border {
  border-top: 1px solid var(--df-color-line, #e6eafb);
}

/* 不用 flex gap：部分小程序支持不全 */
.df-action-bar .df-button + .df-button {
  margin-left: 12px;
}

.df-action-bar .df-button.is-block {
  flex: 1;
}
</style>
