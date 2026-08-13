<script lang="ts">
export default { name: 'DfSwitch' }
</script>

<script setup lang="ts">
/**
 * uniapp 端 Switch。同样不用小程序内置 <switch>：
 * 内置开关只能改 color，尺寸与圆角都改不了，四套主题会破功。
 */
import { switchEmits, switchProps, useSwitch } from '@df-ui/core'

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const { b, classes, checked, toggle } = useSwitch(props, emit)
</script>

<template>
  <view :class="classes" @tap="toggle">
    <view :class="b('track')">
      <text v-if="checkedText || uncheckedText" :class="b('text')">
        {{ checked ? checkedText : uncheckedText }}
      </text>
      <view :class="b('knob')" />
    </view>
  </view>
</template>

<style lang="scss">
.df-switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* 上下留白，让整行的可点高度到 44px */
  padding-top: 6px;
  padding-bottom: 6px;
}

.df-switch.is-disabled {
  opacity: 0.5;
}

.df-switch__track {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* iOS 系统开关的比例，移动端用户最熟的手感 */
  width: 51px;
  height: 31px;
  padding-left: 2px;
  padding-right: 2px;
  border-radius: 999px;
  background-color: var(--df-color-surface-3, #e4e9ff);
  box-sizing: border-box;
}

.df-switch--small .df-switch__track {
  width: 44px;
  height: 26px;
}

.df-switch--large .df-switch__track {
  width: 58px;
  height: 34px;
}

.df-switch__knob {
  position: absolute;
  left: 2px;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: var(--df-color-surface, #ffffff);
}

.df-switch--small .df-switch__knob {
  width: 22px;
  height: 22px;
}

.df-switch--large .df-switch__knob {
  width: 30px;
  height: 30px;
}

.df-switch.is-checked .df-switch__track {
  background-color: var(--df-color-brand, #7b6bff);
}

/* 位移用 left 而不是 transform：加载态要用 transform 转圈，两者会打架 */
.df-switch.is-checked .df-switch__knob {
  left: 22px;
}

.df-switch--small.is-checked .df-switch__knob {
  left: 20px;
}

.df-switch--large.is-checked .df-switch__knob {
  left: 26px;
}

.df-switch__text {
  flex: 1;
  padding-left: 30px;
  padding-right: 6px;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 12px;
  text-align: right;
}

.df-switch.is-checked .df-switch__text {
  padding-left: 6px;
  padding-right: 30px;
  color: var(--df-color-brand-fg, #ffffff);
  text-align: left;
}

.df-switch.is-loading .df-switch__knob {
  border: 2px solid var(--df-color-brand, #7b6bff);
  border-right-color: transparent;
  animation: df-switch-spin 0.7s linear infinite;
}

@keyframes df-switch-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
