<script lang="ts">
export default { name: 'DfNavBar' }
</script>

<script setup lang="ts">
/**
 * uniapp 端顶部标题栏。
 *
 * 用它的前提是页面在 pages.json 里设了 `navigationStyle: "custom"`，
 * 否则会和小程序自带的导航栏叠在一起。自定义的好处是能跟着四套主题换肤，
 * 代价是右上角的胶囊按钮位置得自己避开（微信小程序的胶囊是系统绘制的，挪不动）。
 */
import { computed } from 'vue'
import { bem, navBarEmits, navBarProps } from '@df-ui/core'

const props = defineProps(navBarProps)
const emit = defineEmits(navBarEmits)

const b = bem('nav-bar')

const classes = computed(() => [
  b(),
  b.is('fixed', props.fixed),
  b.is('safe-area', props.safeArea),
  b.is('border', props.border),
])
</script>

<template>
  <view :class="classes">
    <view :class="b('left')">
      <slot name="left">
        <view v-if="showBack" :class="b('back')" @tap="emit('back')">
          <text :class="b('back-icon')">‹</text>
          <text v-if="backText" :class="b('back-text')">{{ backText }}</text>
        </view>
      </slot>
    </view>

    <view :class="b('title')">
      <slot name="title"><text>{{ title }}</text></slot>
    </view>

    <view :class="b('right')">
      <slot name="right" />
    </view>
  </view>
</template>

<style lang="scss">
.df-nav-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: var(--df-m-navbar-h, 52px);
  padding-left: 4px;
  padding-right: 4px;
  background-color: var(--df-color-surface, #ffffff);
  color: var(--df-color-text-1, #2c2f4a);
  box-sizing: content-box;
}

.df-nav-bar.is-fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 90;
}

/* 避开刘海与状态栏 */
.df-nav-bar.is-safe-area {
  padding-top: env(safe-area-inset-top);
}

.df-nav-bar.is-border {
  border-bottom: 1px solid var(--df-color-line, #e6eafb);
}

/* 左右等宽，标题才能真正居中 */
.df-nav-bar__left,
.df-nav-bar__right {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 25%;
  min-width: 0;
}

.df-nav-bar__right {
  justify-content: flex-end;
}

.df-nav-bar__title {
  flex: 1;
  min-width: 0;
  font-size: 16.5px;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.df-nav-bar__back {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 44px;
  height: 44px;
  padding-right: 4px;
}

.df-nav-bar__back-icon {
  padding-left: 8px;
  font-size: 26px;
}

.df-nav-bar__back-text {
  padding-left: 2px;
  font-size: 15px;
}
</style>
