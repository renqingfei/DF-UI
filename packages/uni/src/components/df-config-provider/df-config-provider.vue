<script lang="ts">
export default { name: 'DfConfigProvider' }
</script>

<script setup lang="ts">
/**
 * 小程序端的主题根容器。
 *
 * 用法：把它套在页面（或 App 根组件）最外层，里面的所有 df-* 组件
 * 就都能拿到当前主题的 CSS 变量。换肤仍然调 setTheme('neon')，
 * 与 pc / h5 完全一致。
 *
 * <df-config-provider>
 *   <df-button type="primary">下单</df-button>
 * </df-config-provider>
 */
import { onMounted } from 'vue'
import { setTheme } from '@df-ui/core'
import { DEFAULT_THEME } from '@df-ui/tokens'
import { installUniThemeAdapter, uniActiveTheme, uniThemeClass, uniThemeStyle } from '../../theme'

const props = defineProps({
  /** 初始主题，默认 clay（黏土软糖） */
  theme: {
    type: String,
    default: DEFAULT_THEME,
  },
})

// 适配器要在任何 setTheme 之前装上，否则第一次换肤会打到 Web 适配器上
installUniThemeAdapter()

onMounted(() => {
  setTheme(props.theme)
})
</script>

<template>
  <view class="df-app" :class="uniThemeClass" :style="uniThemeStyle" :data-theme="uniActiveTheme.key">
    <slot />
  </view>
</template>

<style lang="scss">
.df-app {
  min-height: 100%;
  background-color: var(--df-color-bg, #eef1ff);
  color: var(--df-color-text-1, #2c2f4a);
}
</style>
