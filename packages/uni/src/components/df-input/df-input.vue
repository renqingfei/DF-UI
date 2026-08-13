<script lang="ts">
export default { name: 'DfInput' }
</script>

<script setup lang="ts">
/**
 * uniapp 端 Input。
 *
 * 与 pc / h5 共用同一份 props 契约和 useInput 逻辑。小程序特有的地方：
 * 1. 用小程序内置 <input>，它是原生渲染的控件 —— 样式能改，但结构不能自己搭
 * 2. type 要映射成小程序的取值：password 是独立属性，不是 type 的一种
 * 3. 事件对象结构不同：取值在 evt.detail.value
 * 4. placeholder 颜色不能靠 ::placeholder 伪元素，要用 placeholder-class
 */
import { computed } from 'vue'
import { inputEmits, inputProps, useFormControl, useInput } from '@df-ui/core'

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const { b, classes, disabled, text, count, showClear, revealed, focused, normalize } =
  useInput(props)
const { notifyBlur, notifyChange } = useFormControl(props)

/** 小程序的 type 只认这几个值，password 单独走一个布尔属性 */
const uniType = computed(() => {
  switch (props.type) {
    case 'number':
      return 'digit'
    case 'tel':
      return 'number'
    case 'email':
    case 'url':
    case 'search':
    case 'password':
    case 'text':
    default:
      return 'text'
  }
})

const isPassword = computed(() => props.type === 'password' && !revealed.value)

function detailValue(evt: unknown): string {
  const detail = (evt as { detail?: { value?: string } })?.detail
  return detail?.value ?? ''
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

function onClear() {
  emit('update:modelValue', '')
  emit('input', '')
  emit('clear')
  emit('change', '')
  notifyChange()
}
</script>

<template>
  <view :class="classes">
    <view v-if="$slots.prefix" :class="b('prefix')">
      <slot name="prefix" />
    </view>

    <input
      :class="b('inner')"
      :value="text"
      :type="uniType"
      :password="isPassword"
      :placeholder="placeholder"
      placeholder-class="df-input__placeholder"
      :disabled="disabled || readonly"
      :maxlength="maxlength ?? -1"
      :name="name"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @confirm="emit('confirm', text)"
    />

    <view v-if="showClear" :class="b('clear')" hover-class="df-input__clear--pressed" @tap="onClear"
      >✕</view
    >

    <view
      v-if="showPassword && type === 'password'"
      :class="b('reveal')"
      @tap="revealed = !revealed"
      >{{ revealed ? '隐藏' : '显示' }}</view
    >

    <text v-if="showCount && maxlength" :class="b('count')">{{ count }}/{{ maxlength }}</text>

    <view v-if="$slots.suffix" :class="b('suffix')">
      <slot name="suffix" />
    </view>
  </view>
</template>

<style lang="scss">
.df-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: var(--df-m-control-h-md, 48px);
  padding-left: 14px;
  padding-right: 14px;
  border-radius: var(--df-radius-md, 24px);
  background-color: var(--df-color-surface-2, #f2f4ff);
  color: var(--df-color-text-1, #2c2f4a);
  box-sizing: border-box;
}

.df-input--small {
  height: var(--df-m-control-h-sm, 40px);
}

.df-input--large {
  height: var(--df-m-control-h-lg, 56px);
}

.df-input.is-disabled {
  opacity: 0.55;
}

.df-input__inner {
  flex: 1;
  height: 100%;
  min-width: 0;
  color: inherit;
  /* 16px 是移动端输入框字号底线，不要改小 */
  font-size: 16px;
}

.df-input__placeholder {
  color: var(--df-color-text-3, #a5aacb);
}

.df-input__prefix,
.df-input__suffix {
  display: flex;
  align-items: center;
  color: var(--df-color-text-3, #a5aacb);
}

.df-input__clear,
.df-input__reveal {
  display: flex;
  align-items: center;
  justify-content: center;
  /* 视觉是个小图标，可点区域给到 44px */
  width: 44px;
  height: 44px;
  margin-right: -12px;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 13px;
}

.df-input__clear--pressed {
  opacity: 0.55;
}

.df-input__count {
  color: var(--df-color-text-3, #a5aacb);
  font-size: 12px;
}
</style>
