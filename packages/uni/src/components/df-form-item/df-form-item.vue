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

/** 小程序里不能靠 ::before 拼星号，直接在模板里画 */
const labelStyle = computed(() =>
  labelPosition.value === 'left' && labelWidth.value ? { width: labelWidth.value } : {},
)

defineExpose({ validate })
</script>

<template>
  <view :class="classes">
    <view v-if="label || $slots.label" :class="b('label')" :style="labelStyle">
      <text v-if="isRequired" :class="b('star')">＊</text>
      <slot name="label"><text>{{ label }}</text></slot>
    </view>

    <view :class="b('body')">
      <slot />
      <view v-if="showMessage" :class="b('error')">
        <text>{{ error }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.df-form-item {
  display: flex;
  padding-top: 4px;
  padding-bottom: 2px;
}

.df-form-item--label-top {
  flex-direction: column;
}

.df-form-item--label-top .df-form-item__label {
  margin-bottom: 8px;
}

.df-form-item--label-left {
  flex-direction: row;
  align-items: center;
}

.df-form-item--label-left .df-form-item__label {
  min-width: 68px;
  margin-right: 12px;
}

.df-form-item__label {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--df-color-text-2, #8a90b8);
  font-size: 14.5px;
}

.df-form-item__star {
  margin-right: 2px;
  color: var(--df-color-err, #ef5a76);
  font-size: 13px;
}

.df-form-item__body {
  flex: 1;
  min-width: 0;
}

/* 错误行高度常留，报错时表单不会往下抖 */
.df-form-item__error {
  min-height: 20px;
  padding-top: 4px;
  color: var(--df-color-err, #ef5a76);
  font-size: 13px;
  line-height: 16px;
}
</style>
