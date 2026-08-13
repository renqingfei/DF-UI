<script lang="ts">
export default { name: 'DfGrid' }
</script>

<script setup lang="ts">
/**
 * uniapp 端宫格。
 *
 * 列宽用百分比而不是 CSS Grid —— 小程序对 grid 布局支持不全，
 * 与 H5 端保持同一套实现，改起来不会漏。
 */
import { computed } from 'vue'
import { badgeContent, bem, gridEmits, gridProps } from '@df-ui/core'

const props = defineProps(gridProps)
const emit = defineEmits(gridEmits)

const b = bem('grid')

const classes = computed(() => [
  b(),
  b.is('border', props.border),
  b.is('square', props.square),
])

const itemStyle = computed(() => ({ width: `${100 / Math.max(1, props.columns)}%` }))
</script>

<template>
  <view :class="classes">
    <view
      v-for="(item, index) in items"
      :key="String(item.name ?? item.label)"
      :class="[b('item'), item.disabled ? 'is-disabled' : '']"
      :style="itemStyle"
      :hover-class="item.disabled ? 'none' : 'df-grid__item--pressed'"
      @tap="!item.disabled && emit('itemClick', item, index)"
    >
      <view :class="b('inner')">
        <view :class="b('icon')">
          <slot name="icon" :item="item" :index="index"><text>{{ item.icon }}</text></slot>
          <text
            v-if="badgeContent(item.badge) !== null"
            :class="[b('badge'), badgeContent(item.badge) === '' ? 'is-dot' : '']"
            >{{ badgeContent(item.badge) }}</text
          >
        </view>
        <text :class="b('label')">{{ item.label }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.df-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--df-color-surface, #ffffff);
}

.df-grid__item {
  display: flex;
  box-sizing: border-box;
}

.df-grid__item--pressed {
  opacity: 0.7;
}

.df-grid__item.is-disabled {
  opacity: 0.4;
}

/* 只画右边和下边，靠 inset 阴影，相邻格子的线不会叠粗 */
.df-grid.is-border .df-grid__item {
  box-shadow:
    inset -0.5px 0 0 var(--df-color-line, #e6eafb),
    inset 0 -0.5px 0 var(--df-color-line, #e6eafb);
}

.df-grid__inner {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 76px;
  padding: 12px 6px;
}

.df-grid__icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
  font-size: 26px;
}

.df-grid__label {
  color: var(--df-color-text-2, #8a90b8);
  font-size: 12.5px;
  text-align: center;
}

.df-grid__badge {
  position: absolute;
  top: -4px;
  right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: var(--df-radius-pill, 999px);
  background-color: var(--df-color-err, #ef5a76);
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
}

.df-grid__badge.is-dot {
  top: -1px;
  right: -4px;
  min-width: 8px;
  width: 8px;
  height: 8px;
  padding-left: 0;
  padding-right: 0;
}
</style>
