<script lang="ts">
export default { name: 'DfFormItem' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, formItemProps, useFormItem } from '@df-ui/core'

const props = defineProps(formItemProps)

const b = bem('form-item')
const { isRequired, error, showMessage, labelPosition, labelWidth, validate } = useFormItem(props)

const classes = computed(() => [
  b(),
  b.m(`label-${labelPosition.value}`),
  b.is('required', isRequired.value),
  b.is('error', error.value !== ''),
])

defineExpose({ validate })
</script>

<template>
  <div :class="classes">
    <label
      v-if="label || $slots.label"
      :class="b('label')"
      :style="labelPosition === 'left' && labelWidth ? { width: labelWidth } : undefined"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <div :class="b('body')">
      <slot />
      <!-- 报错文字占位一直留着，否则出错时整行会往下顶，表单会跳 -->
      <div v-if="showMessage" :class="b('error')">{{ error }}</div>
    </div>
  </div>
</template>
