<script lang="ts">
export default { name: 'DfGrid' }
</script>

<script setup lang="ts">
/**
 * 宫格：手机首页的「快捷入口」那一块。
 *
 * 列数用百分比宽度而不是 CSS Grid：小程序端对 grid 布局支持不全，
 * 两端保持同一套实现，改起来不会漏。
 */
import { computed } from 'vue'
import { badgeContent, bem, gridEmits, gridProps, toCssLength } from '@df-ui/core'

const props = defineProps(gridProps)
const emit = defineEmits(gridEmits)

const b = bem('grid')

const classes = computed(() => [
  b(),
  b.is('border', props.border),
  b.is('square', props.square),
  b.is('gap', !props.border && props.gap !== undefined),
])

const itemStyle = computed(() => {
  const style: Record<string, string> = { width: `${100 / Math.max(1, props.columns)}%` }
  return style
})

const rootStyle = computed(() => {
  const gap = toCssLength(props.gap)
  return !props.border && gap ? { rowGap: gap } : undefined
})
</script>

<template>
  <div :class="classes" :style="rootStyle">
    <div
      v-for="(item, index) in items"
      :key="String(item.name ?? item.label)"
      :class="[b('item'), item.disabled ? 'is-disabled' : '']"
      :style="itemStyle"
      @click="!item.disabled && emit('itemClick', item, index)"
    >
      <div :class="b('inner')">
        <span :class="b('icon')">
          <slot name="icon" :item="item" :index="index">{{ item.icon }}</slot>
          <span
            v-if="badgeContent(item.badge) !== null"
            :class="[b('badge'), badgeContent(item.badge) === '' ? 'is-dot' : '']"
            >{{ badgeContent(item.badge) }}</span
          >
        </span>
        <span :class="b('label')">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
