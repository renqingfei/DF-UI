<script lang="ts">
export default { name: 'DfList' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, listProps } from '@df-ui/core'

const props = defineProps(listProps)

const b = bem('list')

const classes = computed(() => [b(), b.is('border', props.border), b.is('card', props.card)])
</script>

<template>
  <view :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
.df-list {
  width: 100%;
  background-color: var(--df-color-surface, #ffffff);
  overflow: hidden;
}

.df-list.is-card {
  border-radius: var(--df-radius-lg, 28px);
}

/* 分隔线画在「除第一项以外的每一项」顶部，列表末尾不会多出一条悬空的线 */
.df-list.is-border .df-list-item + .df-list-item {
  border-top: 1px solid var(--df-color-line, #e6eafb);
}
</style>
