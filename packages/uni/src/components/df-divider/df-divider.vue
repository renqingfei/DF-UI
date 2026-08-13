<script lang="ts">
export default { name: 'DfDivider' }
</script>

<script setup lang="ts">
/**
 * uniapp 端分割线。
 *
 * 带文字的版式不能用 ::before / ::after 撑两段线（小程序伪元素支持有限），
 * 改成三个 view 拼：线 + 文字 + 线。
 */
import { computed, useSlots } from 'vue'
import { bem, dividerProps } from '@df-ui/core'

const props = defineProps(dividerProps)
const slots = useSlots()

const b = bem('divider')

const hasText = computed(() => Boolean(slots.default) && props.direction === 'horizontal')

const classes = computed(() => [
  b(),
  b.m(props.direction),
  b.m(`align-${props.align}`),
  b.is('dashed', props.dashed),
  b.is('with-text', hasText.value),
])
</script>

<template>
  <view :class="classes">
    <template v-if="hasText">
      <view :class="[b('line'), b('line', 'start')]" />
      <text :class="b('text')"><slot /></text>
      <view :class="[b('line'), b('line', 'end')]" />
    </template>
  </view>
</template>

<style lang="scss">
.df-divider--horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 18px;
  margin-bottom: 18px;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 13px;
}

/* 没文字时容器自己就是那条线 */
.df-divider--horizontal:not(.is-with-text) {
  height: 0;
  border-top: 1px solid var(--df-color-line, #e6eafb);
}

.df-divider--horizontal.is-dashed:not(.is-with-text) {
  border-top-style: dashed;
}

.df-divider__line {
  flex: 1;
  height: 0;
  border-top: 1px solid var(--df-color-line, #e6eafb);
}

.df-divider.is-dashed .df-divider__line {
  border-top-style: dashed;
}

.df-divider__text {
  padding-left: 12px;
  padding-right: 12px;
}

.df-divider--align-left .df-divider__line--start {
  flex: 0 0 24px;
}

.df-divider--align-right .df-divider__line--end {
  flex: 0 0 24px;
}

.df-divider--vertical {
  display: inline-block;
  width: 0;
  height: 14px;
  margin-left: 10px;
  margin-right: 10px;
  border-left: 1px solid var(--df-color-line, #e6eafb);
}
</style>
