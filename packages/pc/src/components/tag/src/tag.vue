<script lang="ts">
export default { name: 'DfTag' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, tagEmits, tagProps } from '@df-ui/core'

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

const b = bem('tag')

const classes = computed(() => [
  b(),
  b.m(props.type),
  b.m(props.variant),
  b.m(props.size),
  b.is('round', props.round),
  b.is('closable', props.closable),
])
</script>

<template>
  <span :class="classes">
    <span :class="b('text')">
      <slot />
    </span>
    <span
      v-if="closable"
      :class="b('close')"
      role="button"
      aria-label="移除"
      @click.stop="emit('close')"
      >✕</span
    >
  </span>
</template>
