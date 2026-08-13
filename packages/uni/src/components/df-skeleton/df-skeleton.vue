<script lang="ts">
export default { name: 'DfSkeleton' }
</script>

<script setup lang="ts">
/**
 * uniapp 端骨架屏。
 *
 * 版式与三端一致，实现上有两处小程序特有的处理：
 * 1. 全部用纯 CSS 动画，不测量元素 —— 小程序拿不到同步尺寸
 * 2. 不用 flex gap，改用 margin —— 部分小程序 gap 支持不全
 */
import { computed } from 'vue'
import { bem, skeletonProps } from '@df-ui/core'
import SkeletonItem from './df-skeleton-item.vue'

const props = defineProps(skeletonProps)

const b = bem('skeleton')

const classes = computed(() => [b(), b.m(`anim-${props.animation}`), b.is('round', props.round)])

const blocks = computed(() => Array.from({ length: Math.max(1, props.count) }, (_, i) => i))
const lines = computed(() => Array.from({ length: Math.max(0, props.rows) }, (_, i) => i))

function lineWidth(index: number, total: number) {
  return index === total - 1 && total > 1 ? '60%' : '100%'
}
</script>

<template>
  <view v-if="!loading" :class="b('real')">
    <slot />
  </view>

  <view v-else :class="classes">
    <template v-if="template === 'custom'">
      <slot name="template" />
    </template>

    <template v-else-if="template === 'profile'">
      <view :class="b('row')">
        <SkeletonItem variant="circle" width="56px" height="56px" />
        <view :class="b('col')">
          <SkeletonItem width="40%" height="16px" />
          <SkeletonItem width="64%" height="12px" />
        </view>
      </view>
    </template>

    <template v-else-if="template === 'card'">
      <view v-for="i in blocks" :key="i" :class="b('card')">
        <SkeletonItem variant="image" height="150px" />
        <SkeletonItem width="55%" height="16px" />
        <SkeletonItem width="85%" height="12px" />
      </view>
    </template>

    <template v-else-if="template === 'list'">
      <view v-for="i in blocks" :key="i" :class="b('row')">
        <SkeletonItem v-if="avatar" variant="circle" width="40px" height="40px" />
        <view :class="b('col')">
          <SkeletonItem width="45%" height="14px" />
          <SkeletonItem width="80%" height="12px" />
        </view>
      </view>
    </template>

    <template v-else-if="template === 'article'">
      <SkeletonItem v-if="title" width="42%" height="22px" />
      <SkeletonItem variant="image" height="180px" />
      <SkeletonItem v-for="i in lines" :key="i" height="13px" :width="lineWidth(i, lines.length)" />
    </template>

    <template v-else>
      <view v-if="avatar" :class="b('row')">
        <SkeletonItem variant="circle" width="40px" height="40px" />
        <view :class="b('col')">
          <SkeletonItem v-if="title" width="40%" height="15px" />
          <SkeletonItem width="70%" height="12px" />
        </view>
      </view>
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
  </view>
</template>

<style lang="scss">
.df-skeleton {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 不用 gap：部分小程序 flex gap 支持不全 */
.df-skeleton .df-skeleton-item {
  margin-bottom: 10px;
}

.df-skeleton__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
}

.df-skeleton__row .df-skeleton-item--circle {
  margin-right: 14px;
  margin-bottom: 0;
}

.df-skeleton__col {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.df-skeleton__card {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

/* 闪光扫过：只动 background-position，不碰 layout */
.df-skeleton--anim-shimmer .df-skeleton-item {
  background-image: linear-gradient(
    100deg,
    transparent 20%,
    var(--df-color-skeleton-shine, rgba(255,255,255,.95)) 42%,
    transparent 64%
  );
  background-size: 220% 100%;
  background-repeat: no-repeat;
  animation: df-skeleton-shimmer 1.5s ease-in-out infinite;
}

.df-skeleton--anim-pulse .df-skeleton-item {
  animation: df-skeleton-pulse 1.6s ease-in-out infinite;
}

@keyframes df-skeleton-shimmer {
  from {
    background-position: 160% 0;
  }
  to {
    background-position: -60% 0;
  }
}

@keyframes df-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}
</style>
