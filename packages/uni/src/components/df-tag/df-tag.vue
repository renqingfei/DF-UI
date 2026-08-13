<script lang="ts">
export default { name: 'DfTag' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, tagEmits, tagProps } from '@df-ui/core'

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

const b = bem('tag')

const classes = computed(() => [
  b(),
  b.m(props.type),
  b.m(props.variant),
  b.m(props.size),
  b.is('round', props.round),
  b.is('closable', props.closable),
])
</script>

<template>
  <view :class="classes">
    <text :class="b('text')">
      <slot />
    </text>
    <view v-if="closable" :class="b('close')" @tap.stop="emit('close')">✕</view>
  </view>
</template>

<style lang="scss">
.df-tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 26px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: var(--df-radius-sm, 16px);
  background-color: var(--df-color-surface-2, #f2f4ff);
  color: var(--df-color-text-1, #2c2f4a);
  font-size: 13px;
  font-weight: 600;
  box-sizing: border-box;
}

.df-tag--small {
  height: 22px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 12px;
}

.df-tag--large {
  height: 30px;
  padding-left: 13px;
  padding-right: 13px;
  font-size: 14.5px;
}

.df-tag--brand {
  background-color: var(--df-color-brand-soft, #edebff);
  color: var(--df-color-brand, #7b6bff);
}

.df-tag--success {
  background-color: var(--df-color-ok-bg, #d9fbe8);
  color: var(--df-color-ok, #12a05e);
}

.df-tag--warning {
  background-color: var(--df-color-warn-bg, #fff1d9);
  color: var(--df-color-warn, #d98a1f);
}

.df-tag--danger {
  background-color: var(--df-color-err-bg, #ffe4ea);
  color: var(--df-color-err, #ef5a76);
}

.df-tag--info {
  background-color: var(--df-color-surface-2, #f2f4ff);
  color: var(--df-color-text-2, #8a90b8);
}

/* solid：底色换成语义色本体，文字反白 */
.df-tag--solid.df-tag--brand {
  background-color: var(--df-color-brand, #7b6bff);
  color: var(--df-color-brand-fg, #ffffff);
}

.df-tag--solid.df-tag--success {
  background-color: var(--df-color-ok, #12a05e);
  color: #ffffff;
}

.df-tag--solid.df-tag--warning {
  background-color: var(--df-color-warn, #d98a1f);
  color: #ffffff;
}

.df-tag--solid.df-tag--danger {
  background-color: var(--df-color-err, #ef5a76);
  color: #ffffff;
}

.df-tag--outline {
  background-color: transparent;
  border: 1px solid var(--df-color-line, #e6eafb);
}

.df-tag.is-round {
  border-radius: var(--df-radius-pill, 999px);
}

/* 关闭叉的可点区域撑大，手指够得着 */
.df-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 26px;
  margin-right: -8px;
  opacity: 0.6;
  font-size: 11px;
}
</style>
