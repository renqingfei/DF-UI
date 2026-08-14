<script lang="ts">
export default { name: 'DfRadio' }
</script>

<script setup lang="ts">
import { radioEmits, radioProps, useRadio } from '@df-ui/core'

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const { b, classes, disabled, pick } = useRadio(props, emit)
</script>

<template>
  <view :class="classes" :hover-class="disabled ? 'none' : 'df-radio--pressed'" @tap="pick">
    <view :class="b('box')">
      <view :class="b('dot')" />
    </view>
    <text v-if="label || $slots.default" :class="b('label')">
      <slot>{{ label }}</slot>
    </text>
  </view>
</template>

<style lang="scss">
.df-radio {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 44px;
  color: var(--df-color-text-1, #2c2f4a);
  font-size: 15px;
}

.df-radio--pressed {
  opacity: 0.7;
}

.df-radio.is-disabled {
  opacity: 0.45;
}

.df-radio__box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: var(--df-color-surface-2, #f2f4ff);
}

.df-radio__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: var(--df-color-brand-fg, #ffffff);
  transform: scale(0);
}

.df-radio.is-checked .df-radio__box {
  background-color: var(--df-color-brand, #7b6bff);
}

.df-radio.is-checked .df-radio__dot {
  transform: scale(1);
}

/* button 形态：分段控件 */
.df-radio--button {
  min-height: 0;
  height: var(--df-m-control-h-md, 44px);
  padding-left: 18px;
  padding-right: 18px;
  border-radius: var(--df-radius-md, 24px);
  background-color: var(--df-color-surface-2, #f2f4ff);
  font-weight: 600;
}

.df-radio--button .df-radio__box {
  display: none;
}

.df-radio--button.is-checked {
  background-color: var(--df-color-brand, #7b6bff);
  color: var(--df-color-brand-fg, #ffffff);
}
</style>
