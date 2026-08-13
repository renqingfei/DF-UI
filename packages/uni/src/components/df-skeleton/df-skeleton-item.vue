<script lang="ts">
export default { name: 'DfSkeletonItem' }
</script>

<script setup lang="ts">
import { skeletonItemProps, useSkeletonItem } from '@df-ui/core'

const props = defineProps(skeletonItemProps)
const { classes, style } = useSkeletonItem(props)
</script>

<template>
  <view :class="classes" :style="style" />
</template>

<style lang="scss">
.df-skeleton-item {
  display: block;
  width: 100%;
  height: 13px;
  border-radius: 7px;
  background-color: var(--df-color-skeleton, #e4e8fb);
}

.df-skeleton-item--circle {
  border-radius: 50%;
}

.df-skeleton-item--image {
  height: 150px;
  border-radius: 12px;
}

.df-skeleton-item--rect {
  border-radius: 0;
}
</style>
