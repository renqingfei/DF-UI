<script setup lang="ts">
import { setTheme, useTheme } from '@df-ui/core'
import { themeList } from '@df-ui/tokens'

const { themeKey } = useTheme()

/** 主题色卡：左半是品牌色、右半是页面底色，一眼看出这套主题的气质 */
function swatch(brand: string, bg: string) {
  return `linear-gradient(140deg, ${brand} 48%, ${bg} 52%)`
}
</script>

<template>
  <div class="ts">
    <span class="ts-label">主题</span>
    <button
      v-for="t in themeList"
      :key="t.key"
      class="ts-item"
      :class="{ on: themeKey === t.key }"
      :title="t.description"
      @click="setTheme(t.key)"
    >
      <span
        class="ts-sw"
        :style="{ background: swatch(t.tokens['color-brand'], t.tokens['color-bg']) }"
      />
      {{ t.name }}
    </button>
  </div>
</template>
