<script lang="ts">
export default { name: 'DfDivider' }
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { bem, dividerProps } from '@df-ui/core'

const props = defineProps(dividerProps)
const slots = useSlots()

const b = bem('divider')

const hasText = computed(() => Boolean(slots.default) && props.direction === 'horizontal')

const classes = computed(() => [
  b(),
  b.m(props.direction),
  b.m(`align-${props.align}`),
  b.is('dashed', props.dashed),
  b.is('with-text', hasText.value),
])
</script>

<template>
  <div :class="classes" role="separator">
    <span v-if="hasText" :class="b('text')">
      <slot />
    </span>
  </div>
</template>
