<script lang="ts">
export default { name: 'DfTextarea' }
</script>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { textareaEmits, textareaProps, useFormControl, useInput } from '@df-ui/core'

const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)

const { b, classes, disabled, text, count, focused, normalize } = useInput(props, {
  block: 'textarea',
})
const { notifyBlur, notifyChange } = useFormControl(props)

const inner = ref<HTMLTextAreaElement | null>(null)

const rootClasses = computed(() => [...classes.value, b.is('autosize', props.autosize)])

/**
 * 自动增高：先把高度清零量出真实内容高度，再设回去。
 * 不这么做的话，删字时高度只会涨不会缩。
 */
function resize() {
  const el = inner.value
  if (!el || !props.autosize) return
  el.style.height = 'auto'
  const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 21
  const max = lineHeight * props.maxRows
  el.style.height = `${Math.min(el.scrollHeight, max)}px`
}

function emitValue(next: string) {
  emit('update:modelValue', next)
  emit('input', next)
}

function onInput(evt: Event) {
  const raw = (evt.target as HTMLTextAreaElement).value
  const next = normalize(raw)
  if (next !== raw && inner.value) inner.value.value = next
  emitValue(next)
  void nextTick(resize)
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

function onChange() {
  emit('change', text.value)
  notifyChange()
}

onMounted(resize)
watch(() => props.modelValue, () => void nextTick(resize))

defineExpose({
  focus: () => inner.value?.focus(),
  blur: () => inner.value?.blur(),
})
</script>

<template>
  <div :class="rootClasses">
    <textarea
      ref="inner"
      :class="b('inner')"
      :value="text"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :name="name"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span v-if="showCount && maxlength" :class="b('count')">{{ count }}/{{ maxlength }}</span>
  </div>
</template>
