<script lang="ts">
export default { name: 'DfButton' }
</script>

<script setup lang="ts">
/**
 * uniapp 端 Button。
 *
 * 与 pc / h5 共用同一份 props 契约（@df-ui/core）和同一个 useButton 逻辑，
 * 差异全在这一层小程序限制上：
 * 1. 用 <view> + <text> 而不是 <button>：小程序原生 button 的样式几乎改不动，
 *    组件库要完全掌控外观，只能自己搭
 * 2. 按下反馈用小程序原生的 hover-class，不靠 CSS :active（视图层直接处理，比 JS 快）
 * 3. 尺寸一律 px 不用 rpx：44px 是「最小可点区域」的物理下限，
 *    换成 rpx 后小屏手机上会缩到点不准
 * 4. 每个 CSS 变量都带写死的兜底值，供不支持 CSS 变量的低版本小程序使用
 *
 * 平台差异（已记入文档）：nativeType 在小程序端无效 —— 表单提交要用
 * uni 原生 <button form-type>，而本组件是 view 实现。
 */
import { computed } from 'vue'
import { buttonEmits, buttonProps, useButton } from '@df-ui/core'

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const { b, classes, isDisabled } = useButton(props)

/** 小程序的按下态由视图层直接加类，禁用时关掉 */
const hoverClass = computed(() => (isDisabled.value ? 'none' : 'df-button--pressed'))

function onTap(evt: unknown) {
  if (isDisabled.value) return
  // 小程序的 tap 事件对象不是 MouseEvent，但契约按 Web 端的类型定义，
  // 这里收窄一次，好处是 pc / h5 使用方能拿到完整的 MouseEvent 提示
  emit('click', evt as MouseEvent)
}
</script>

<template>
  <view
    :class="classes"
    :hover-class="hoverClass"
    hover-stay-time="70"
    :aria-disabled="isDisabled ? 'true' : undefined"
    @tap="onTap"
  >
    <view v-if="loading" :class="b('spinner')" />
    <view v-else-if="$slots.icon" :class="b('icon')">
      <slot name="icon" />
    </view>
    <text v-if="$slots.default" :class="b('content')">
      <slot />
    </text>
  </view>
</template>

<style lang="scss">
/**
 * 小程序样式约束：
 * - 不用通配符、不用后代深选择器，只用类名（小程序选择器支持有限）
 * - 每个变量都带兜底值 var(--x, 写死值)，低版本小程序拿不到变量也不会没样式；
 *   兜底值必须与默认主题 clay 一致，由 __tests__/button.test.ts 逐个比对
 * - 不用 gap（部分小程序 flex gap 支持不全），改用 margin
 */
.df-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: var(--df-m-control-h-md, 48px);
  padding-left: 20px;
  padding-right: 20px;
  border-radius: var(--df-radius-md, 24px);
  background-color: var(--df-color-surface-2, #f2f4ff);
  color: var(--df-color-text-1, #2c2f4a);
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
}

.df-button--pressed {
  opacity: 0.82;
  transform: scale(0.97);
}

/* —— 语义类型 —— */
.df-button--primary {
  background-color: var(--df-color-brand, #7b6bff);
  color: var(--df-color-brand-fg, #ffffff);
}

.df-button--success {
  background-color: var(--df-color-ok, #12a05e);
  color: #ffffff;
}

.df-button--warning {
  background-color: var(--df-color-warn, #d98a1f);
  color: #ffffff;
}

.df-button--danger {
  background-color: var(--df-color-err, #ef5a76);
  color: #ffffff;
}

/* —— 填充方式 —— */
.df-button--soft {
  background-color: var(--df-color-brand-soft, #edebff);
  color: var(--df-color-brand, #7b6bff);
}

.df-button--ghost {
  background-color: transparent;
  color: var(--df-color-text-2, #8a90b8);
}

.df-button--text {
  background-color: transparent;
  color: var(--df-color-brand, #7b6bff);
  padding-left: 10px;
  padding-right: 10px;
}

/* —— 尺寸：走移动端令牌 —— */
.df-button--small {
  height: var(--df-m-control-h-sm, 40px);
  padding-left: 14px;
  padding-right: 14px;
  border-radius: var(--df-radius-sm, 16px);
  font-size: 13px;
}

.df-button--large {
  height: var(--df-m-control-h-lg, 56px);
  padding-left: 28px;
  padding-right: 28px;
  font-size: 17px;
}

/* —— 形状 —— */
.df-button--round {
  border-radius: var(--df-radius-pill, 999px);
}

.df-button--circle {
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
  width: var(--df-m-control-h-md, 48px);
}

/* —— 状态 —— */
.df-button.is-block {
  width: 100%;
  height: var(--df-m-control-h-lg, 56px);
  font-size: 17px;
}

.df-button.is-disabled {
  opacity: 0.42;
}

.df-button__icon {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.df-button__content {
  line-height: 1;
}

/* 小程序不支持 border 动画转圈的部分伪类写法，用 transform 动画兜住 */
.df-button__spinner {
  width: 15px;
  height: 15px;
  margin-right: 8px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: df-button-spin 0.7s linear infinite;
}

@keyframes df-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
