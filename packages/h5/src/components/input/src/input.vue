<script lang="ts">
export default { name: 'DfInput' }
</script>

<script setup lang="ts">
/**
 * H5 端 Input。与 PC 端共用 props 契约和 useInput 逻辑，差异全在触屏体验：
 * 1. 字号锁死 ≥16px（写在样式里）—— iOS Safari 聚焦小于 16px 的输入框会自动放大整页
 * 2. 按 type 给出 inputmode 与 enterkeyhint，唤起对应键盘、把回车键变成「搜索」「前往」
 * 3. 清空按钮的点击区域放大到 44px，手指点得中
 */
import { computed, ref } from 'vue'
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

/** 移动端键盘类型。number 用 decimal 而不是 numeric，否则输不了小数点 */
const inputMode = computed(() => {
  switch (props.type) {
    case 'number':
      return 'decimal'
    case 'tel':
      return 'tel'
    case 'email':
      return 'email'
    case 'url':
      return 'url'
    case 'search':
      return 'search'
    default:
      return 'text'
  }
})

const enterKeyHint = computed(() => (props.type === 'search' ? 'search' : 'done'))

function emitValue(next: string) {
  emit('update:modelValue', next)
  emit('input', next)
}

function onInput(evt: Event) {
  const raw = (evt.target as HTMLInputElement).value
  const next = normalize(raw)
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
}

defineExpose({
  focus: () => inner.value?.focus(),
  blur: () => inner.value?.blur(),
})
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
      :name="name"
      :inputmode="inputMode"
      :enterkeyhint="enterKeyHint"
      :aria-invalid="invalid || undefined"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="emit('confirm', text)"
    />

    <span v-if="showClear" :class="b('clear')" role="button" aria-label="清空" @click="onClear"
      >✕</span
    >

    <span
      v-if="showPassword && type === 'password'"
      :class="b('reveal')"
      role="button"
      :aria-label="revealed ? '隐藏密码' : '显示密码'"
      @click="revealed = !revealed"
      >{{ revealed ? '👁' : '👁‍🗨' }}</span
    >

    <span v-if="showCount && maxlength" :class="b('count')">{{ count }}/{{ maxlength }}</span>

    <span v-if="$slots.suffix" :class="b('suffix')">
      <slot name="suffix" />
    </span>
  </div>
</template>
