<script lang="ts">
export default { name: 'DfSpace' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { spaceProps, useSpace } from '@df-ui/core'

const props = defineProps(spaceProps)

const { classes, gap } = useSpace(props)

const style = computed(() => ({ gap: gap.value }))
</script>

<template>
  <div :class="classes" :style="style">
    <slot />
  </div>
</template>
