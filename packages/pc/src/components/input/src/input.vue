<script lang="ts">
export default { name: 'DfInput' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { inputEmits, inputProps, useFormControl, useInput } from '@df-ui/core'

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const {
  b,
  classes,
  disabled,
  invalid,
  text,
  count,
  showClear,
  revealed,
  focused,
  nativeType,
  normalize,
} = useInput(props)
const { notifyBlur, notifyChange } = useFormControl(props)

const inner = ref<HTMLInputElement | null>(null)

function emitValue(next: string) {
  emit('update:modelValue', next)
  emit('input', next)
}

function onInput(evt: Event) {
  const raw = (evt.target as HTMLInputElement).value
  const next = normalize(raw)
  // 规整后与用户敲的不一致（超长、trim 掉了空格），要把输入框拉回来
  if (next !== raw && inner.value) inner.value.value = next
  emitValue(next)
}

function onChange() {
  emit('change', text.value)
  notifyChange()
}

function onFocus(evt: FocusEvent) {
  focused.value = true
  emit('focus', evt)
}

function onBlur(evt: FocusEvent) {
  focused.value = false
  emit('blur', evt)
  notifyBlur()
}

function onClear() {
  emitValue('')
  emit('clear')
  emit('change', '')
  notifyChange()
  inner.value?.focus()
}

function focus() {
  inner.value?.focus()
}

function blur() {
  inner.value?.blur()
}

defineExpose({ focus, blur })
</script>

<template>
  <div :class="classes">
    <span v-if="$slots.prefix" :class="b('prefix')">
      <slot name="prefix" />
    </span>

    <input
      ref="inner"
      :class="b('inner')"
      :type="nativeType"
      :value="text"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :autofocus="autofocus"
      :name="name"
      :aria-invalid="invalid || undefined"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="emit('confirm', text)"
    />

    <span
      v-if="showClear"
      :class="b('clear')"
      role="button"
      aria-label="清空"
      @mousedown.prevent
      @click="onClear"
      >✕</span
    >

    <span
      v-if="showPassword && type === 'password'"
      :class="b('reveal')"
      role="button"
      :aria-label="revealed ? '隐藏密码' : '显示密码'"
      @mousedown.prevent
      @click="revealed = !revealed"
      >{{ revealed ? '👁' : '👁‍🗨' }}</span
    >

    <span v-if="showCount && maxlength" :class="b('count')">{{ count }}/{{ maxlength }}</span>

    <span v-if="$slots.suffix" :class="b('suffix')">
      <slot name="suffix" />
    </span>
  </div>
</template>
