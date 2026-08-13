<script lang="ts">
export default { name: 'DfListItem' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, listItemEmits, listItemProps } from '@df-ui/core'

const props = defineProps(listItemProps)
const emit = defineEmits(listItemEmits)

const b = bem('list-item')

const interactive = computed(() => (props.clickable || props.arrow) && !props.disabled)

const classes = computed(() => [
  b(),
  b.is('clickable', interactive.value),
  b.is('disabled', props.disabled),
])
</script>

<template>
  <view
    :class="classes"
    :hover-class="interactive ? 'df-list-item--pressed' : 'none'"
    @tap="!disabled && emit('click')"
  >
    <view v-if="$slots.icon" :class="b('icon')">
      <slot name="icon" />
    </view>

    <view :class="b('main')">
      <view :class="b('title')">
        <slot name="title"><text>{{ title }}</text></slot>
      </view>
      <view v-if="label || $slots.label" :class="b('label')">
        <slot name="label"><text>{{ label }}</text></slot>
      </view>
    </view>

    <view v-if="value || $slots.value" :class="b('value')">
      <slot name="value"><text>{{ value }}</text></slot>
    </view>

    <text v-if="arrow" :class="b('arrow')">›</text>
  </view>
</template>

<style lang="scss">
.df-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* 列表行是手机上点击最频繁的元素，矮了误触率就上去 */
  min-height: 52px;
  padding: 12px var(--df-m-card-padding, 18px);
  color: var(--df-color-text-1, #2c2f4a);
  box-sizing: border-box;
}

.df-list-item--pressed {
  background-color: var(--df-color-surface-2, #f2f4ff);
}

.df-list-item.is-disabled {
  opacity: 0.45;
}

.df-list-item__icon {
  display: flex;
  align-items: center;
  margin-right: 12px;
  font-size: 22px;
}

.df-list-item__main {
  flex: 1;
  min-width: 0;
}

.df-list-item__title {
  font-size: 15.5px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.df-list-item__label {
  margin-top: 2px;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 12.5px;
}

.df-list-item__value {
  max-width: 50%;
  margin-left: 12px;
  color: var(--df-color-text-2, #8a90b8);
  font-size: 14px;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.df-list-item__arrow {
  margin-left: 4px;
  margin-right: -4px;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 20px;
}
</style>
