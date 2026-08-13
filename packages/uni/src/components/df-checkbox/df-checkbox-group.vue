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
  <view :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
.df-checkbox-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.df-checkbox-group .df-checkbox {
  margin-right: 18px;
}
</style>
