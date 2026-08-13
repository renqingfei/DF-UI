<script lang="ts">
export default { name: 'DfBadge' }
</script>

<script setup lang="ts">
import { badgeProps, bem, useBadge } from '@df-ui/core'

const props = defineProps(badgeProps)

const b = bem('badge')
const { classes, content, visible } = useBadge(props)
</script>

<template>
  <span :class="b('wrap')">
    <slot />
    <span v-if="visible" :class="classes">{{ content }}</span>
  </span>
</template>
