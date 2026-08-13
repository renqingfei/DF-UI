<script lang="ts">
export default { name: 'DfSkeleton' }
</script>

<script setup lang="ts">
/**
 * 骨架屏。
 *
 * 关键不是「画几个灰块」，而是**形状要和真内容对得上** ——
 * 骨架和真内容错位，切换的瞬间页面会跳一下，比白屏更难受。
 * 所以内置的五种版式都是照着常见页面结构定的，而且最后一行文本
 * 会自动收窄到 60%，因为真段落的末行本来就不会占满。
 */
import { computed } from 'vue'
import { bem, skeletonProps } from '@df-ui/core'
import SkeletonItem from './skeleton-item.vue'

const props = defineProps(skeletonProps)

const b = bem('skeleton')

const classes = computed(() => [
  b(),
  b.m(`anim-${props.animation}`),
  b.is('round', props.round),
])

/** 重复条数，list 版式常用 */
const blocks = computed(() => Array.from({ length: Math.max(1, props.count) }, (_, i) => i))
const lines = computed(() => Array.from({ length: Math.max(0, props.rows) }, (_, i) => i))

/** 末行收窄，模仿真实段落 */
function lineWidth(index: number, total: number) {
  return index === total - 1 && total > 1 ? '60%' : '100%'
}
</script>

<template>
  <div v-if="!loading" :class="b('real')">
    <slot />
  </div>

  <div v-else :class="classes" role="status" aria-busy="true" aria-live="polite">
    <template v-if="template === 'custom'">
      <slot name="template" />
    </template>

    <template v-else-if="template === 'profile'">
      <div :class="b('row')">
        <SkeletonItem variant="circle" width="56px" height="56px" />
        <div :class="b('col')">
          <SkeletonItem width="40%" height="16px" />
          <SkeletonItem width="64%" height="12px" />
        </div>
      </div>
    </template>

    <template v-else-if="template === 'card'">
      <div v-for="i in blocks" :key="i" :class="b('card')">
        <SkeletonItem variant="image" height="150px" />
        <SkeletonItem width="55%" height="16px" />
        <SkeletonItem width="85%" height="12px" />
      </div>
    </template>

    <template v-else-if="template === 'list'">
      <div v-for="i in blocks" :key="i" :class="b('row')">
        <SkeletonItem v-if="avatar" variant="circle" width="40px" height="40px" />
        <div :class="b('col')">
          <SkeletonItem width="45%" height="14px" />
          <SkeletonItem width="80%" height="12px" />
        </div>
      </div>
    </template>

    <template v-else-if="template === 'article'">
      <SkeletonItem v-if="title" width="42%" height="22px" />
      <SkeletonItem variant="image" height="180px" />
      <SkeletonItem
        v-for="i in lines"
        :key="i"
        height="13px"
        :width="lineWidth(i, lines.length)"
      />
    </template>

    <template v-else>
      <div v-if="avatar" :class="b('row')">
        <SkeletonItem variant="circle" width="40px" height="40px" />
        <div :class="b('col')">
          <SkeletonItem v-if="title" width="40%" height="15px" />
          <SkeletonItem width="70%" height="12px" />
        </div>
      </div>
      <template v-else>
        <SkeletonItem v-if="title" width="38%" height="17px" />
        <SkeletonItem
          v-for="i in lines"
          :key="i"
          height="13px"
          :width="lineWidth(i, lines.length)"
        />
      </template>
    </template>
  </div>
</template>
