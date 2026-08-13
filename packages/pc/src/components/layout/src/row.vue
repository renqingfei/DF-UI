<script lang="ts">
export default { name: 'DfRow' }
</script>

<script setup lang="ts">
/**
 * 栅格的行。24 等分制，与 Element / Ant Design 一致 ——
 * 24 能被 2/3/4/6/8/12 整除，是最好分的数。
 *
 * gutter 用负 margin + 子元素 padding 实现，不用 flex gap：
 * gap 会把「一行放不下自动折行」时的行间距也算进去，导致上下间距对不齐。
 */
import { computed, provide } from 'vue'
import { bem, rowProps, toCssLength } from '@df-ui/core'

const props = defineProps(rowProps)

const b = bem('row')

const gutter = computed(() => toCssLength(props.gutter) ?? '0px')

// 子列从这里取 gutter，自己加左右 padding
provide('df-row-gutter', gutter)

const classes = computed(() => [
  b(),
  b.m(`justify-${props.justify}`),
  b.m(`align-${props.align}`),
  b.is('wrap', props.wrap),
])

const style = computed(() => {
  if (props.gutter === 0) return undefined
  return { marginLeft: `calc(${gutter.value} / -2)`, marginRight: `calc(${gutter.value} / -2)` }
})
</script>

<template>
  <div :class="classes" :style="style">
    <slot />
  </div>
</template>
