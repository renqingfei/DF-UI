<script lang="ts">
export default { name: 'DfCheckbox' }
</script>

<script setup lang="ts">
/**
 * H5 端 Checkbox。结构与 PC 端一致，差异在样式：
 * 整行的可点高度撑到 44px，勾选框本身画得更大 —— 手机上 17px 的小方块点不准。
 */
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
    @click="toggle"
  >
    <span :class="b('box')">
      <span :class="b('mark')" aria-hidden="true" />
    </span>
    <span v-if="label || $slots.default" :class="b('label')">
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>
