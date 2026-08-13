<script lang="ts">
export default { name: 'DfLoading' }
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { bem, loadingProps, nextZIndex } from '@df-ui/core'

const props = defineProps(loadingProps)

const b = bem('loading')

/**
 * 层级只在「变成整屏遮罩」的那一刻领一次。
 * 不能写在 computed 里 —— nextZIndex() 会写它自己依赖的那个 ref，
 * computed 里调用就变成「自己改自己的依赖」，Vue 会直接死循环。
 */
const zIndex = ref<number>()

watch(
  () => props.fullscreen && props.loading,
  (on) => {
    if (on) zIndex.value = nextZIndex()
  },
  { immediate: true },
)

const classes = computed(() => [
  b(),
  typeof props.size === 'string' ? b.m(props.size) : '',
  b.is('overlay', props.overlay || props.fullscreen),
  b.is('fullscreen', props.fullscreen),
])

const style = computed(() => {
  const s: Record<string, string | number> = {}
  if (typeof props.size === 'number') s['--df-loading-size'] = `${props.size}px`
  if (props.fullscreen && zIndex.value !== undefined) s.zIndex = zIndex.value
  return s
})
</script>

<template>
  <div v-if="loading" :class="classes" :style="style" role="status" aria-live="polite">
    <span :class="b('spinner')" aria-hidden="true" />
    <span v-if="text || $slots.default" :class="b('text')">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>
