<script lang="ts">
export default { name: 'DfCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, cardProps, toCssLength } from '@df-ui/core'

const props = defineProps(cardProps)

const b = bem('card')

const classes = computed(() => [
  b(),
  b.m(`shadow-${props.shadow}`),
  b.is('divided', props.divided),
])

const bodyStyle = computed(() => {
  const padding = toCssLength(props.padding)
  return padding === undefined ? {} : { padding }
})
</script>

<template>
  <view :class="classes">
    <view v-if="title || $slots.header || $slots.extra" :class="b('header')">
      <view :class="b('title')">
        <slot name="header"><text>{{ title }}</text></slot>
      </view>
      <view v-if="$slots.extra" :class="b('extra')">
        <slot name="extra" />
      </view>
    </view>

    <view :class="b('body')" :style="bodyStyle">
      <slot />
    </view>

    <view v-if="$slots.footer" :class="b('footer')">
      <slot name="footer" />
    </view>
  </view>
</template>

<style lang="scss">
.df-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--df-radius-lg, 28px);
  background-color: var(--df-color-surface, #ffffff);
  color: var(--df-color-text-1, #2c2f4a);
  overflow: hidden;
}

.df-card__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--df-m-card-padding, 18px);
  padding-bottom: 0;
}

.df-card.is-divided .df-card__header {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--df-color-line, #e6eafb);
}

.df-card__title {
  flex: 1;
  min-width: 0;
  font-size: 16.5px;
  font-weight: 600;
}

.df-card__extra {
  color: var(--df-color-text-2, #8a90b8);
  font-size: 13.5px;
}

.df-card__body {
  flex: 1;
  padding: var(--df-m-card-padding, 18px);
  min-width: 0;
}

.df-card__footer {
  padding: 12px var(--df-m-card-padding, 18px);
  border-top: 1px solid var(--df-color-line, #e6eafb);
  color: var(--df-color-text-2, #8a90b8);
  font-size: 13.5px;
}
</style>
