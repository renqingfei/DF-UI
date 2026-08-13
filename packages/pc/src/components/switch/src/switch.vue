<script lang="ts">
export default { name: 'DfSwitch' }
</script>

<script setup lang="ts">
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
    :tabindex="disabled ? undefined : 0"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
    <span :class="b('track')">
      <span v-if="checkedText || uncheckedText" :class="b('text')">
        {{ checked ? checkedText : uncheckedText }}
      </span>
      <span :class="b('knob')" aria-hidden="true" />
    </span>
  </span>
</template>
