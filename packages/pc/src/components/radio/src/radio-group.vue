<script lang="ts">
export default { name: 'DfRadioGroup' }
</script>

<script setup lang="ts">
import { radioGroupEmits, radioGroupProps, useRadioGroupProvide } from '@df-ui/core'

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const { classes } = useRadioGroupProvide(props, emit)
</script>

<template>
  <span :class="classes" role="radiogroup">
    <slot />
  </span>
</template>
