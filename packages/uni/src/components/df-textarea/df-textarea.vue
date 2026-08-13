<script lang="ts">
export default { name: 'DfTextarea' }
</script>

<script setup lang="ts">
/**
 * uniapp 端 Textarea。
 *
 * 小程序的 textarea 是原生组件，有两个绕不开的坑：
 * 1. 它永远盖在其他元素上层（原生组件层级最高），所以别把弹层压在它上面
 * 2. auto-height 由小程序自己实现，不需要我们量 scrollHeight
 */
import { computed } from 'vue'
import { textareaEmits, textareaProps, useFormControl, useInput } from '@df-ui/core'

const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)

const { b, classes, disabled, text, count, focused, normalize } = useInput(props, {
  block: 'textarea',
})
const { notifyBlur, notifyChange } = useFormControl(props)

const rootClasses = computed(() => [...classes.value, b.is('autosize', props.autosize)])

function detailValue(evt: unknown): string {
  return (evt as { detail?: { value?: string } })?.detail?.value ?? ''
}

function onInput(evt: unknown) {
  const next = normalize(detailValue(evt))
  emit('update:modelValue', next)
  emit('input', next)
}

function onFocus(evt: unknown) {
  focused.value = true
  emit('focus', evt)
}

function onBlur(evt: unknown) {
  focused.value = false
  emit('blur', evt)
  emit('change', text.value)
  notifyBlur()
  notifyChange()
}
</script>

<template>
  <view :class="rootClasses">
    <textarea
      :class="b('inner')"
      :value="text"
      :placeholder="placeholder"
      placeholder-class="df-textarea__placeholder"
      :disabled="disabled || readonly"
      :maxlength="maxlength ?? -1"
      :auto-height="autosize"
      :name="name"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <text v-if="showCount && maxlength" :class="b('count')">{{ count }}/{{ maxlength }}</text>
  </view>
</template>

<style lang="scss">
.df-textarea {
  display: block;
  width: 100%;
  padding: 12px 14px;
  border-radius: var(--df-radius-md, 24px);
  background-color: var(--df-color-surface-2, #f2f4ff);
  box-sizing: border-box;
}

.df-textarea.is-disabled {
  opacity: 0.55;
}

.df-textarea__inner {
  display: block;
  width: 100%;
  min-height: 72px;
  color: var(--df-color-text-1, #2c2f4a);
  font-size: 16px;
  line-height: 1.6;
}

.df-textarea__placeholder {
  color: var(--df-color-text-3, #a5aacb);
}

.df-textarea__count {
  display: block;
  margin-top: 6px;
  text-align: right;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 12px;
}
</style>
