<script lang="ts">
export default { name: 'DfSwitch' }
</script>

<script setup lang="ts">
/**
 * H5 端 Switch。尺寸按 iOS 的开关比例放大（51×31 那一档），
 * 手机上 26px 高的开关点起来会误触到相邻行。
 */
import { switchEmits, switchProps, useSwitch } from '@df-ui/core'

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const { b, classes, checked, disabled, toggle } = useSwitch(props, emit)
</script>

<template>
  <span
    :class="classes"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="disabled || undefined"
    @click="toggle"
  >
    <span :class="b('track')">
      <span v-if="checkedText || uncheckedText" :class="b('text')">
        {{ checked ? checkedText : uncheckedText }}
      </span>
      <span :class="b('knob')" aria-hidden="true" />
    </span>
  </span>
</template>
