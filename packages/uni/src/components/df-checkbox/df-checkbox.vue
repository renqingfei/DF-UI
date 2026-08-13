<script lang="ts">
export default { name: 'DfCheckbox' }
</script>

<script setup lang="ts">
/**
 * uniapp 端 Checkbox。
 *
 * 没用小程序内置的 <checkbox>：它的勾选框是原生渲染的，颜色只能改 color、
 * 大小和圆角完全动不了，四套主题会瞬间破功。所以用 view 自己画。
 */
import { checkboxEmits, checkboxProps, useCheckbox } from '@df-ui/core'

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const { b, classes, disabled, toggle } = useCheckbox(props, emit)
</script>

<template>
  <view :class="classes" :hover-class="disabled ? 'none' : 'df-checkbox--pressed'" @tap="toggle">
    <view :class="b('box')">
      <view :class="b('mark')" />
    </view>
    <text v-if="label || $slots.default" :class="b('label')">
      <slot>{{ label }}</slot>
    </text>
  </view>
</template>

<style lang="scss">
.df-checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 44px;
  color: var(--df-color-text-1, #2c2f4a);
  font-size: 15px;
}

.df-checkbox--pressed {
  opacity: 0.7;
}

.df-checkbox.is-disabled {
  opacity: 0.45;
}

.df-checkbox__box {
  position: relative;
  width: 21px;
  height: 21px;
  margin-right: 10px;
  border-radius: 7px;
  background-color: var(--df-color-surface-2, #f2f4ff);
}

.df-checkbox__mark {
  position: absolute;
  top: 4px;
  left: 7px;
  width: 5px;
  height: 10px;
  border-right: 2px solid var(--df-color-brand-fg, #ffffff);
  border-bottom: 2px solid var(--df-color-brand-fg, #ffffff);
  transform: rotate(40deg) scale(0);
}

.df-checkbox.is-checked .df-checkbox__box {
  background-color: var(--df-color-brand, #7b6bff);
}

.df-checkbox.is-checked .df-checkbox__mark {
  transform: rotate(40deg) scale(1);
}

.df-checkbox.is-indeterminate .df-checkbox__box {
  background-color: var(--df-color-brand, #7b6bff);
}

/* 半选画一条横杠 */
.df-checkbox.is-indeterminate .df-checkbox__mark {
  top: 9px;
  left: 4px;
  width: 11px;
  height: 0;
  border-right: 0;
  border-bottom: 2px solid var(--df-color-brand-fg, #ffffff);
  transform: none;
}

.df-checkbox__label {
  line-height: 1.4;
}
</style>
