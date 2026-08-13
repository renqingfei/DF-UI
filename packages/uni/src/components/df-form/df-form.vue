<script lang="ts">
export default { name: 'DfForm' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, formEmits, formProps, useFormProvide } from '@df-ui/core'

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const b = bem('form')
const { validate, validateFields, resetFields, clearValidate, hasError } = useFormProvide(
  props,
  emit,
)

const classes = computed(() => [b(), b.m(`label-${props.labelPosition}`), b.m(props.size)])

defineExpose({ validate, validateFields, resetFields, clearValidate, hasError })
</script>

<template>
  <view :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
.df-form {
  width: 100%;
}
</style>
