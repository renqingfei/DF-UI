<script lang="ts">
export default { name: 'DfEmpty' }
</script>

<script setup lang="ts">
/**
 * 空状态。
 *
 * 插画用 CSS 与内联 SVG 画，不引图片资源 —— 空状态往往出现在弱网场景，
 * 这时候再去加载一张插画图很可能也失败，等于空状态自己也空了。
 */
import { computed } from 'vue'
import { bem, emptyProps } from '@df-ui/core'

const props = defineProps(emptyProps)

const b = bem('empty')

const classes = computed(() => [b(), b.m(props.size)])
</script>

<template>
  <div :class="classes">
    <div v-if="image !== 'none'" :class="b('art')" aria-hidden="true">
      <slot name="image">
        <svg viewBox="0 0 120 96" :class="b('svg')">
          <!-- 盒子：没数据 -->
          <g v-if="image === 'box'" fill="none" stroke-width="3" stroke-linejoin="round">
            <path d="M18 40h84v38a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V40Z" :class="b('shape')" />
            <path d="M12 26h96v14H12z" :class="b('shape')" />
            <path d="M50 52h20" :class="b('line')" stroke-linecap="round" />
          </g>
          <!-- 放大镜：搜不到 -->
          <g v-else-if="image === 'search'" fill="none" stroke-width="3" stroke-linecap="round">
            <circle cx="52" cy="44" r="22" :class="b('shape')" />
            <path d="M68 60l18 18" :class="b('line')" />
          </g>
          <!-- 断线：网络出错 -->
          <g v-else fill="none" stroke-width="3" stroke-linecap="round">
            <path d="M24 56a36 36 0 0 1 30-16" :class="b('shape')" />
            <path d="M96 56a36 36 0 0 0-22-15" :class="b('shape')" />
            <path d="M44 68a20 20 0 0 1 14-6" :class="b('shape')" />
            <circle cx="60" cy="78" r="3.5" :class="b('dot')" />
            <path d="M84 24 36 76" :class="b('line')" />
          </g>
        </svg>
      </slot>
    </div>

    <div v-if="description || $slots.description" :class="b('desc')">
      <slot name="description">{{ description }}</slot>
    </div>

    <div v-if="$slots.default" :class="b('action')">
      <slot />
    </div>
  </div>
</template>
