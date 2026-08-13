<script lang="ts">
export default { name: 'DfLoading' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { bem, loadingProps } from '@df-ui/core'

const props = defineProps(loadingProps)

const b = bem('loading')

const classes = computed(() => [
  b(),
  typeof props.size === 'string' ? b.m(props.size) : '',
  b.is('overlay', props.overlay || props.fullscreen),
  b.is('fullscreen', props.fullscreen),
])

const style = computed(() =>
  typeof props.size === 'number' ? { '--df-loading-size': `${props.size}px` } : {},
)
</script>

<template>
  <view v-if="loading" :class="classes" :style="style">
    <view :class="b('spinner')" />
    <text v-if="text" :class="b('text')">{{ text }}</text>
  </view>
</template>

<style lang="scss">
.df-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.df-loading__spinner {
  width: 32px;
  height: 32px;
  border: 2.5px solid var(--df-color-brand, #7b6bff);
  border-right-color: transparent;
  border-radius: 50%;
  animation: df-loading-spin 0.7s linear infinite;
}

.df-loading--small .df-loading__spinner {
  width: 22px;
  height: 22px;
}

.df-loading--large .df-loading__spinner {
  width: 46px;
  height: 46px;
}

.df-loading__text {
  margin-top: 10px;
  color: var(--df-color-text-2, #8a90b8);
  font-size: 14px;
}

.df-loading.is-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--df-color-bg, #eef1ff);
  opacity: 0.88;
}

.df-loading.is-fullscreen {
  position: fixed;
}

@keyframes df-loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
