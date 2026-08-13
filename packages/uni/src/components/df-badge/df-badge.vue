<script lang="ts">
export default { name: 'DfBadge' }
</script>

<script setup lang="ts">
import { badgeProps, bem, useBadge } from '@df-ui/core'

const props = defineProps(badgeProps)

const b = bem('badge')
const { classes, content, visible } = useBadge(props)
</script>

<template>
  <view :class="b('wrap')">
    <slot />
    <text v-if="visible" :class="classes">{{ content }}</text>
  </view>
</template>

<style lang="scss">
.df-badge__wrap {
  position: relative;
  display: inline-flex;
}

.df-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 19px;
  height: 19px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: var(--df-radius-pill, 999px);
  background-color: var(--df-color-err, #ef5a76);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  box-sizing: border-box;
}

.df-badge--brand {
  background-color: var(--df-color-brand, #7b6bff);
  color: var(--df-color-brand-fg, #ffffff);
}

.df-badge--success {
  background-color: var(--df-color-ok, #12a05e);
}

.df-badge--warning {
  background-color: var(--df-color-warn, #d98a1f);
}

.df-badge--info,
.df-badge--default {
  background-color: var(--df-color-text-3, #a5aacb);
}

.df-badge.is-dot {
  min-width: 10px;
  width: 10px;
  height: 10px;
  padding-left: 0;
  padding-right: 0;
}
</style>
