<script lang="ts">
export default { name: 'DfTabs' }
</script>

<script setup lang="ts">
/**
 * uniapp 端标签页。
 *
 * 横向滚动用小程序的 <scroll-view scroll-x>，不用 overflow: auto ——
 * 小程序里普通 view 的横向滚动不跟手，scroll-view 才是原生滚动。
 */
import { badgeContent, tabsEmits, tabsProps, useTabs } from '@df-ui/core'

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const { b, classes, itemClasses, select } = useTabs(props, emit)
</script>

<template>
  <view :class="classes">
    <scroll-view :class="b('nav')" :scroll-x="scrollable && !equalWidth">
      <view :class="b('nav-inner')">
        <view
          v-for="item in items"
          :key="String(item.name)"
          :class="itemClasses(item)"
          @tap="select(item)"
        >
          <text :class="b('label')">{{ item.label }}</text>
          <text
            v-if="badgeContent(item.badge) !== null"
            :class="[b('badge'), badgeContent(item.badge) === '' ? 'is-dot' : '']"
            >{{ badgeContent(item.badge) }}</text
          >
          <view :class="b('indicator')" />
        </view>
      </view>
    </scroll-view>

    <view v-if="$slots.default" :class="b('body')">
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
.df-tabs {
  width: 100%;
}

.df-tabs__nav {
  position: relative;
  width: 100%;
  white-space: nowrap;
}

.df-tabs__nav-inner {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.df-tabs.is-equal .df-tabs__nav-inner {
  width: 100%;
}

.df-tabs.is-equal .df-tabs__item {
  flex: 1;
  justify-content: center;
}

.df-tabs__item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  color: var(--df-color-text-2, #8a90b8);
  font-size: 15px;
  font-weight: 600;
}

.df-tabs__item.is-active {
  color: var(--df-color-brand, #7b6bff);
}

.df-tabs__item.is-disabled {
  opacity: 0.4;
}

.df-tabs__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  margin-left: 6px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: var(--df-radius-pill, 999px);
  background-color: var(--df-color-err, #ef5a76);
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
}

.df-tabs__badge.is-dot {
  min-width: 7px;
  width: 7px;
  height: 7px;
  padding-left: 0;
  padding-right: 0;
}

/* 指示器画在激活项内部，宽度天然正确，不需要测量元素 */
.df-tabs__indicator {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 0;
  height: 2.5px;
  border-radius: 3px;
  background-color: var(--df-color-brand, #7b6bff);
  opacity: 0;
}

.df-tabs__item.is-active .df-tabs__indicator {
  opacity: 1;
}

.df-tabs--line {
  border-bottom: 1px solid var(--df-color-line, #e6eafb);
}

.df-tabs--card .df-tabs__item.is-active {
  background-color: var(--df-color-surface, #ffffff);
  border-radius: var(--df-radius-sm, 16px) var(--df-radius-sm, 16px) 0 0;
}

.df-tabs--card .df-tabs__indicator {
  display: none;
}

.df-tabs--segment .df-tabs__nav-inner {
  padding: 4px;
  border-radius: var(--df-radius-md, 24px);
  background-color: var(--df-color-surface-2, #f2f4ff);
}

.df-tabs--segment .df-tabs__item {
  height: 40px;
  border-radius: var(--df-radius-sm, 16px);
}

.df-tabs--segment .df-tabs__item.is-active {
  background-color: var(--df-color-brand, #7b6bff);
  color: var(--df-color-brand-fg, #ffffff);
}

.df-tabs--segment .df-tabs__indicator {
  display: none;
}

.df-tabs__body {
  padding-top: 16px;
}
</style>
