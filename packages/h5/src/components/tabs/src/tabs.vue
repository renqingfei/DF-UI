<script lang="ts">
export default { name: 'DfTabs' }
</script>

<script setup lang="ts">
/**
 * 标签页。三种形态：下划线、卡片、分段控件。
 *
 * 指示器画在激活项内部，不做跨标签滑动 —— 理由见 core 的 use-tabs.ts。
 * 内容区完全交给使用方：Tabs 只管切 name，不接管内容的显示隐藏，
 * 这样它既能配合 v-if 切内容，也能配合路由跳转。
 */
import { badgeContent, tabsEmits, tabsProps, useTabs } from '@df-ui/core'

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const { b, classes, isActive, itemClasses, select } = useTabs(props, emit)
</script>

<template>
  <div :class="classes">
    <div :class="b('nav')" role="tablist">
      <slot name="nav">
        <div
          v-for="item in items"
          :key="String(item.name)"
          :class="itemClasses(item)"
          role="tab"
          :aria-selected="isActive(item)"
          :tabindex="isActive(item) ? 0 : -1"
          @click="select(item)"
          @keydown.enter.prevent="select(item)"
        >
          <span :class="b('label')">{{ item.label }}</span>
          <span
            v-if="badgeContent(item.badge) !== null"
            :class="[b('badge'), badgeContent(item.badge) === '' ? 'is-dot' : '']"
            >{{ badgeContent(item.badge) }}</span
          >
          <span :class="b('indicator')" aria-hidden="true" />
        </div>
      </slot>
    </div>

    <div v-if="$slots.default" :class="b('body')">
      <slot />
    </div>
  </div>
</template>
