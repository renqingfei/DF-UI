<script lang="ts">
export default { name: 'DfCheckbox' }
</script>

<script setup lang="ts">
import { checkboxEmits, checkboxProps, useCheckbox } from '@df-ui/core'

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const { b, classes, checked, disabled, toggle } = useCheckbox(props, emit)
</script>

<template>
  <span
    :class="classes"
    role="checkbox"
    :aria-checked="indeterminate && !checked ? 'mixed' : checked"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? undefined : 0"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
    <span :class="b('box')">
      <span :class="b('mark')" aria-hidden="true" />
    </span>
    <span v-if="label || $slots.default" :class="b('label')">
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>
