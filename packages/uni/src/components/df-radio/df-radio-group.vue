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
  <view :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
.df-radio-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.df-radio-group .df-radio {
  margin-right: 18px;
}

.df-radio-group--button {
  padding: 5px;
  border-radius: var(--df-radius-lg, 28px);
  background-color: var(--df-color-surface-2, #f2f4ff);
}

.df-radio-group--button .df-radio {
  margin-right: 6px;
}
</style>
