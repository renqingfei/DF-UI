<script lang="ts">
export default { name: 'DfCheckboxGroup' }
</script>

<script setup lang="ts">
import { checkboxGroupEmits, checkboxGroupProps, useCheckboxGroupProvide } from '@df-ui/core'

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

const { classes } = useCheckboxGroupProvide(props, emit)
</script>

<template>
  <span :class="classes" role="group">
    <slot />
  </span>
</template>
