<script lang="ts">
export default { name: 'DfCol' }
</script>

<script setup lang="ts">
/**
 * 栅格的列。
 *
 * 响应式断点靠类名 + 媒体查询实现，不用 JS 监听窗口尺寸 ——
 * 监听 resize 在小程序端要走异步接口，而且窗口拖动时会疯狂触发。
 */
import { computed, inject, type Ref } from 'vue'
import { bem, colProps } from '@df-ui/core'

const props = defineProps(colProps)

const b = bem('col')

const gutter = inject<Ref<string>>('df-row-gutter', undefined as never)

const classes = computed(() =>
  [
    b(),
    b.m(`${props.span}`),
    props.offset > 0 ? b.m(`offset-${props.offset}`) : '',
    props.sm !== undefined ? b.m(`sm-${props.sm}`) : '',
    props.md !== undefined ? b.m(`md-${props.md}`) : '',
    props.lg !== undefined ? b.m(`lg-${props.lg}`) : '',
  ].filter(Boolean),
)

const style = computed(() => {
  const g = gutter?.value
  if (!g || g === '0px') return undefined
  return { paddingLeft: `calc(${g} / 2)`, paddingRight: `calc(${g} / 2)` }
})
</script>

<template>
  <div :class="classes" :style="style">
    <slot />
  </div>
</template>
