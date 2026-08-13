<script lang="ts">
export default { name: 'DfTabBar' }
</script>

<script setup lang="ts">
/**
 * 底部导航栏。只有移动端有 —— PC 端对应的是侧边菜单。
 *
 * 两个移动端必须做对的细节：
 * 1. 底部补 safe-area，否则 iPhone 的手势条会压住最后一排图标
 * 2. 每一项的可点高度不低于 48px，这是拇指在屏幕最下沿的命中率保障
 */
import { badgeContent, tabBarEmits, tabBarProps, useTabBar } from '@df-ui/core'

const props = defineProps(tabBarProps)
const emit = defineEmits(tabBarEmits)

const { b, classes, isActive, itemClasses, select } = useTabBar(props, emit)
</script>

<template>
  <div :class="classes" role="tablist">
    <div
      v-for="item in items"
      :key="String(item.name)"
      :class="itemClasses(item)"
      role="tab"
      :aria-selected="isActive(item)"
      @click="select(item)"
    >
      <span :class="b('icon')">
        <slot name="icon" :item="item">{{ item.icon }}</slot>
        <span
          v-if="badgeContent(item.badge) !== null"
          :class="[b('badge'), badgeContent(item.badge) === '' ? 'is-dot' : '']"
          >{{ badgeContent(item.badge) }}</span
        >
      </span>
      <span :class="b('label')">{{ item.label }}</span>
    </div>
  </div>
</template>
