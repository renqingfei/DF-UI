<script lang="ts">
export default { name: 'DfButton' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem } from '@df-ui/core'
import { buttonProps, buttonEmits } from './button'

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const b = bem('button')

const isDisabled = computed(() => props.disabled || props.loading)

const classes = computed(() => [
  b(),
  b.m(props.type),
  b.m(props.variant),
  b.m(props.size),
  props.shape !== 'default' ? b.m(props.shape) : '',
  b.is('block', props.block),
  b.is('loading', props.loading),
  b.is('disabled', isDisabled.value),
])

function onClick(evt: MouseEvent) {
  if (isDisabled.value) {
    evt.preventDefault()
    evt.stopPropagation()
    return
  }
  emit('click', evt)
}
</script>

<template>
  <button
    :class="classes"
    :type="nativeType"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <span v-if="loading" :class="b('spinner')" aria-hidden="true" />
    <span v-else-if="$slots.icon" :class="b('icon')">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" :class="b('content')">
      <slot />
    </span>
  </button>
</template>
