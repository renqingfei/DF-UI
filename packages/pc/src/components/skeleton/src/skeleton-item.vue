<script lang="ts">
export default { name: 'DfSkeletonItem' }
</script>

<script setup lang="ts">
import { skeletonItemProps, useSkeletonItem } from '@df-ui/core'

const props = defineProps(skeletonItemProps)
const { classes, style } = useSkeletonItem(props)
</script>

<template>
  <span :class="classes" :style="style" aria-hidden="true" />
</template>
