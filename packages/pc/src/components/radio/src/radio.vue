<script lang="ts">
export default { name: 'DfRadio' }
</script>

<script setup lang="ts">
import { radioEmits, radioProps, useRadio } from '@df-ui/core'

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const { b, classes, checked, disabled, pick } = useRadio(props, emit)
</script>

<template>
  <span
    :class="classes"
    role="radio"
    :aria-checked="checked"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? undefined : 0"
    @click="pick"
    @keydown.space.prevent="pick"
  >
    <span :class="b('box')">
      <span :class="b('dot')" aria-hidden="true" />
    </span>
    <span v-if="label || $slots.default" :class="b('label')">
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>
