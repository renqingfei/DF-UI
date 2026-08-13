<script lang="ts">
export default { name: 'DfTabBar' }
</script>

<script setup lang="ts">
/**
 * uniapp 端底部导航。
 *
 * 注意：如果页面在 pages.json 里配了原生 tabBar，就不要再用这个组件 ——
 * 两个会叠在一起。自定义导航栏的好处是能跟着四套主题换肤，
 * 代价是切页时会有一帧闪动（原生 tabBar 是常驻的）。
 */
import { badgeContent, tabBarEmits, tabBarProps, useTabBar } from '@df-ui/core'

const props = defineProps(tabBarProps)
const emit = defineEmits(tabBarEmits)

const { b, classes, itemClasses, select } = useTabBar(props, emit)
</script>

<template>
  <view :class="classes">
    <view
      v-for="item in items"
      :key="String(item.name)"
      :class="itemClasses(item)"
      @tap="select(item)"
    >
      <view :class="b('icon')">
        <slot name="icon" :item="item"><text>{{ item.icon }}</text></slot>
        <text
          v-if="badgeContent(item.badge) !== null"
          :class="[b('badge'), badgeContent(item.badge) === '' ? 'is-dot' : '']"
          >{{ badgeContent(item.badge) }}</text
        >
      </view>
      <text :class="b('label')">{{ item.label }}</text>
    </view>
  </view>
</template>

<style lang="scss">
.df-tabbar {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  height: var(--df-m-tabbar-h, 68px);
  background-color: var(--df-color-surface, #ffffff);
  box-sizing: content-box;
}

.df-tabbar.is-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

/* 避开 iPhone 底部手势条 */
.df-tabbar.is-safe-area {
  padding-bottom: env(safe-area-inset-bottom);
}

.df-tabbar__item {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  color: var(--df-color-text-3, #a5aacb);
  font-size: 11px;
}

.df-tabbar__item.is-active {
  color: var(--df-color-brand, #7b6bff);
}

.df-tabbar__item.is-disabled {
  opacity: 0.4;
}

.df-tabbar__icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  margin-bottom: 3px;
  font-size: 20px;
}

.df-tabbar__badge {
  position: absolute;
  top: -3px;
  right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: var(--df-radius-pill, 999px);
  background-color: var(--df-color-err, #ef5a76);
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
}

.df-tabbar__badge.is-dot {
  top: 0;
  right: -5px;
  min-width: 8px;
  width: 8px;
  height: 8px;
  padding-left: 0;
  padding-right: 0;
}
</style>
