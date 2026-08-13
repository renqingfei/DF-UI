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
  <div :class="classes">
    <slot />
  </div>
</template>
